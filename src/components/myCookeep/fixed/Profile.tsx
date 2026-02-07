import MyCookeepHeader from "./MyCookeepHeader";
import { groundImg, refreshIcon, renameIcon } from "../../../assets";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import ProfileEditModal from "../modals/ProfileEditModal";
import { useCookeepsStore } from "../../../stores/useCookeepsStore";

export default function Profile() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const goal = location.state?.updatedGoal || "주 3회 요리하기!";
  //사용자 정보 (나중에 API 연동 시 상태로 관리)
  const [nickname] = useState("요리잘하는 쿠쿠");
  const daysCookeep = "365";
  // const handleSaveProfile = (newNickname: string, selectedPlant: string) => {
  //   console.log("저장될 데이터:", { newNickname, selectedPlant });
  //   setNickname(newNickname);
  //   setIsEditModalOpen(false);
  // };

  const setProfilePlant = useCookeepsStore((s) => s.setProfilePlant);
  const currentPlant = useCookeepsStore((s) => s.currentPlant);

  const handleSaveProfile = async (userPlantId: number) => {
    await setProfilePlant(userPlantId);
    setIsEditModalOpen(false);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        {/* 헤더 섹션 */}
        <div className="w-full h-[369px] bg-gradient-to-b from-[#32E389] to-[#1FC16F] rounded-b-[36px] flex flex-col items-center justify-center">
          <MyCookeepHeader />

          {/* 식물 사진 및 수정 버튼 */}
          <div className="relative inline-block overflow-visible">
            <img
              src={currentPlant?.imageUrl ?? groundImg}
              alt="profileBackground"
              className="w-[155px] p-6 rounded-full object-cover"
            />

            <button
              className="absolute bottom-6 right-6 transition-transform active:scale-90"
              onClick={() => {
                console.log("프로필 수정 버튼 클릭됨");
                setIsEditModalOpen(true);
              }}
            >
              <img src={refreshIcon} alt="refresh" className="w-[22px]" />
            </button>
          </div>

          <p className="typo-h2 text-white -mt-2">{nickname}</p>

          <div className="flex items-center gap-px h-5 px-3 bg-[#E6FBEB] typo-caption rounded-[100px] mt-[7px]">
            <span className="text-(--color-green)">{daysCookeep}</span>
            <span className="text-zinc-500">일 째 Cookeep</span>
          </div>

          {/* 목표 요약 바 */}
          <div className="bg-[#1DAD64] p-3 w-[361px] h-12 flex items-center justify-between gap-3 rounded-[12px] shadow-[0px_4px_16px_-10px_rgba(0,0,0,0.25)] mt-[23px]">
            <span className="text-green-300 typo-body2 truncate">
              이번주 목표는... {goal}
            </span>
            <button
              onClick={() => navigate("/mycookeep/goals")}
              className="w-6 flex items-center justify-center h-full"
            >
              <img
                src={renameIcon}
                alt="rename"
                className="brightness-0 invert-[100%] w-4"
              />
            </button>
          </div>
        </div>
      </div>

      {/* 프로필 수정 모달 (바텀 시트) */}
      <ProfileEditModal
        key={currentPlant?.userPlantId}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveProfile}
      />
    </>
  );
}
