import MyCookeepHeader from "./MyCookeepHeader";
import { groundImg, refreshIcon, renameIcon } from "../../../assets";
import { useLocation, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import ProfileEditModal from "../modals/ProfileEditModal";
import { useCookeepsStore } from "../../../stores/useCookeepsStore";
import { getProfileInfo, type ProfileData } from "../../../api/user";
import { GOAL_TYPE_MAP } from "../../../utils/mapping";

export default function Profile() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showBubble, setShowBubble] = useState(false);

  const fetchProfile = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getProfileInfo();
      if (response.status === "OK") {
        setProfile(response.data);
      }
    } catch (error) {
      console.error("프로필 로딩 실패:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile, location.key]);

  useEffect(() => {
    if (!isLoading && profile && !profile.weeklyGoal) {
      setShowBubble(true);
      const timer = setTimeout(() => {
        setShowBubble(false);
      }, 7000); // 7초 뒤 사라짐

      return () => clearTimeout(timer); // 언마운트 시 타이머 클리어
    }
  }, [isLoading, profile, location.key]);

  const setProfilePlant = useCookeepsStore((s) => s.setProfilePlant);
  const setProfileAuto = useCookeepsStore((s) => s.setProfileAuto);

  const handleSaveProfile = async (userPlantId: number) => {
    await setProfilePlant(userPlantId);
    setProfileAuto(false);
    await fetchProfile();
    setIsEditModalOpen(false);
  };

  if (isLoading)
    return (
      <div className="flex justify-center pt-20">유저 데이터 로딩 중...</div>
    );
  if (!profile)
    return (
      <div className="flex justify-center pt-20">
        데이터를 불러올 수 없습니다.
      </div>
    );

  const currentGoalEntry = Object.entries(GOAL_TYPE_MAP).find(
    ([, g]) => g.value === profile.weeklyGoal?.goalActionType,
  );

  const goalLabel = currentGoalEntry
    ? currentGoalEntry[1].label
    : "목표를 설정해주세요";
  const goalId = currentGoalEntry ? currentGoalEntry[0] : "cook";
  const targetCount = profile.weeklyGoal?.targetCount ?? 0;

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        {/* 헤더 섹션 */}
        <div className="w-full h-[260px] bg-gradient-to-b from-[#32E389] to-[#1FC16F] rounded-b-[36px] flex flex-col items-center justify-center">
          <MyCookeepHeader />

          <div className="flex w-[361px] mt-5 items-center justify-start">
            {/* 식물 사진 및 수정 버튼 */}
            <div className="relative w-31 shrink-0 inline-block">
              <img
                src={profile.profilePlantImageUrl || groundImg}
                alt="profileBackground"
                className="w-full p-6 rounded-full object-cover"
              />
              <button
                className="absolute bottom-4.5 right-5 transition-transform active:scale-90"
                onClick={() => {
                  console.log("프로필 수정 버튼 클릭됨");
                  setIsEditModalOpen(true);
                }}
              >
                <img src={refreshIcon} alt="refresh" className="w-[32px]" />
              </button>
            </div>
            {/* 유저 정보 */}
            <div className="flex flex-col">
              <p className="typo-h2 text-white">
                {profile.nickname || "쿠킵이"}
              </p>
              <div className="typo-caption text-white">
                <span>
                  지금은 {profile.growingPlantName || "요리 실력을"} 키우는 중!
                </span>
              </div>
              <div className="flex items-center justify-center gap-[2px] h-5 px-3 bg-[#E6FBEB] rounded-[100px] mt-3 w-fit mx-auto">
                <span className="typo-caption text-(--color-green) leading-none flex items-center">
                  {profile.daysSinceJoined}
                </span>
                <span className="typo-caption text-zinc-500 leading-none flex items-center">
                  일째 CooKeep
                </span>
              </div>
            </div>
          </div>

          {/* 목표 요약 바 */}
          <div className="bg-[#1DAD64] p-3 w-[361px] h-12 flex items-center justify-between gap-3 rounded-[12px] shadow-[0px_4px_16px_-10px_rgba(0,0,0,0.25)]">
            <span
              className={`typo-body2 truncate ${profile.weeklyGoal ? "text-white" : "text-green-300"}`}
            >
              {profile.weeklyGoal ? (
                <>
                  이번주 목표는... 주 {targetCount}회 {goalLabel}!
                </>
              ) : (
                <>이번주 목표는...</>
              )}
            </span>
            <button
              onClick={() =>
                navigate("/mycookeep/goals", {
                  state: {
                    currentGoalId: goalId,
                    currentCount: profile.weeklyGoal?.targetCount ?? 0,
                  },
                })
              }
              className="w-6 flex items-center justify-center h-full"
            >
              <img
                src={renameIcon}
                alt="rename"
                className="brightness-0 invert-[100%] w-4"
              />
            </button>
          </div>

          {showBubble && !profile.weeklyGoal && (
            <div className="absolute top-[245px] flex justify-center animate-float-bubble shrink-0">
              <div
                className="relative z-10 inline-flex text-center justify-center items-center px-[16px] py-[9px] rounded-[3px] bg-white text-zinc-500 text-[12px] font-medium shadow-[0_4px_16px_rgba(0,0,0,0.13)]"
                style={{ width: 227, height: 28 }}
              >
                이번 주 달성하고 싶은 목표를 세워보세요!
              </div>
              <div
                className="absolute top-0 translate-y-[-50%] w-[12px] h-[12px] bg-white rotate-45 z-0"
                style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.13)" }}
              />
            </div>
          )}
        </div>
      </div>

      {/* 프로필 수정 모달 (바텀 시트) */}
      <ProfileEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveProfile}
      />
    </>
  );
}
