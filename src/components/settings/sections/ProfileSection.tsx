// src/pages/settings/sections/ProfileSection.tsx
import { useEffect, useRef, useState } from "react";
import SettingsInputItem from "../components/SettingsInputItem";
import axios from "axios";
import { getMyProfile, updateNickname } from "../../../api/user";

const MASKED_PASSWORD = "********";

type ProfileInfo = {
  nickname: string;
  phone: string;
  email: string;
};

export default function ProfileSection() {
  const MAX_NICKNAME_LENGTH = 10;

  const [account, setAccount] = useState<ProfileInfo>({
    nickname: "",
    phone: "",
    email: "",
  });

  const [authProvider, setAuthProvider] = useState<"LOCAL" | string>("LOCAL");
  const isSocialLogin = authProvider !== "LOCAL";
  const [loading, setLoading] = useState(true);

  const [isEditingNickname, setIsEditingNickname] = useState(false);
  const nicknameInputRef = useRef<HTMLInputElement>(null);

  const isNicknameError = account.nickname.length > MAX_NICKNAME_LENGTH;

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        setLoading(true);

        const res = await getMyProfile();
        const data = res.data;

        setAccount({
          nickname: data.Nickname,
          phone: data.phoneNumber,
          email: data.email,
        });

        setAuthProvider(data.authProvider);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 401) {
            alert("로그인이 필요합니다.");
          } else {
            alert("회원 정보를 불러오지 못했습니다.");
          }
        } else {
          alert("알 수 없는 오류가 발생했습니다.");
        }
      } finally {
        setLoading(false); // 끝
      }
    };

    fetchAccount();
  }, []);

  useEffect(() => {
    if (isEditingNickname) {
      nicknameInputRef.current?.focus();
    }
  }, [isEditingNickname]);

  const handleNicknameSave = async () => {
    if (!account.nickname.trim() || isNicknameError) return;

    try {
      await updateNickname(account.nickname);

      setIsEditingNickname(false);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const code = err.response?.data?.code;

        if (code === "DUPLICATE_NICKNAME") {
          alert("이미 사용 중인 닉네임입니다.");
        } else if (code === "UNAUTHORIZED") {
          alert("로그인이 필요합니다.");
        } else {
          alert("닉네임 변경 중 오류가 발생했습니다.");
        }
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  if (loading) return null;

  return (
    <section className="px-4">
      <div className="flex flex-col gap-[22px]">
        {/* ===== 닉네임 (inline edit) ===== */}
        <div className="flex flex-col h-20 gap-2 w-full relative">
          <span className="typo-body text-[#202020] px-3">닉네임</span>

          <div
            className={`
            flex items-center justify-between w-full h-[44px] px-3 border rounded-[6px] transition-colors
            ${isNicknameError ? "border-[#D91F1F]" : "border-[#DDD]"}
          `}
          >
            {isEditingNickname ? (
              <>
                <input
                  ref={nicknameInputRef}
                  value={account.nickname}
                  onChange={(e) => {
                    const value = e.target.value;
                    setAccount((prev) => ({
                      ...prev,
                      nickname: value,
                    }));
                  }}
                  className="
                    flex-1
                    h-full
                    w-45
                    outline-none
                    typo-body-sm
                    text-[#202020]
                  "
                />
                <button
                  onClick={handleNicknameSave}
                  disabled={!account.nickname.trim() || isNicknameError}
                  className="
                    w-[115px]
                    px-[18px]
                    py-1
                    rounded-full
                    bg-[#202020]
                    text-white
                    typo-caption
                    font-medium
                  "
                >
                  변경 완료
                </button>
              </>
            ) : (
              <>
                <span className="typo-body-sm text-[#AEAEAE]">
                  {account.nickname}
                </span>

                <button
                  onClick={() => setIsEditingNickname(true)}
                  className="
                    w-[115px]
                    px-[18px]
                    py-1
                    rounded-full
                    bg-[#202020]
                    text-white
                    typo-caption
                    font-medium
                  "
                >
                  닉네임 변경
                </button>
              </>
            )}
          </div>
          <div className="absolute top-19 px-2">
            {isEditingNickname && isNicknameError && (
              <span className="text-[#D91F1F] typo-caption leading-0">
                닉네임은 10글자 이하로 입력해주세요
              </span>
            )}
          </div>
        </div>

        <SettingsInputItem
          label="휴대전화"
          value={isSocialLogin ? "" : account.phone}
          buttonText="휴대폰 번호 변경"
          to="/settings/phone"
          disabled={isSocialLogin}
        />

        <SettingsInputItem
          label="이메일"
          value={account.email}
          buttonText="이메일 주소 변경"
          to="/settings/email"
        />

        {/* 비밀번호는 항상 고정 */}
        <SettingsInputItem
          label="비밀번호"
          value={isSocialLogin ? "" : MASKED_PASSWORD}
          buttonText="비밀번호 변경"
          to="/settings/password"
          disabled={isSocialLogin}
        />
      </div>
    </section>
  );
}
