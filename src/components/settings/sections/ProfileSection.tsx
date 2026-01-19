// src/pages/settings/sections/ProfileSection.tsx

import { useEffect, useRef, useState } from "react";
import SettingsInputItem from "../components/SettingsInputItem";

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

  const [isEditingNickname, setIsEditingNickname] = useState(false);
  const nicknameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchAccount = async () => {
      // 나중에 API
      const data = {
        nickname: "밥말아먹는 수육",
        phone: "010-1234-5678",
        email: "abcdef@gmail.com",
      };
      setAccount(data);
    };

    fetchAccount();
  }, []);

  useEffect(() => {
    if (isEditingNickname) {
      nicknameInputRef.current?.focus();
    }
  }, [isEditingNickname]);

  const handleNicknameSave = () => {
    if (!account.nickname.trim()) return;
    if (account.nickname.length > MAX_NICKNAME_LENGTH) return;

    // TODO: 닉네임 변경 API
    setIsEditingNickname(false);
  };

  return (
    <section className="px-4">
      <div className="flex flex-col gap-[22px]">
        {/* ===== 닉네임 (inline edit) ===== */}
        <div className="flex flex-col gap-2 h-[80px] w-full">
          <span className="typo-body text-[#202020] px-3">닉네임</span>

          <div className="flex items-center justify-between w-full h-[44px] px-3 border border-[#DDD] rounded-[6px]">
            {isEditingNickname ? (
              <>
                <input
                  ref={nicknameInputRef}
                  value={account.nickname}
                  onChange={(e) => {
                    const value = e.target.value;

                    if (value.length > MAX_NICKNAME_LENGTH) return;

                    setAccount((prev) => ({
                      ...prev,
                      nickname: value,
                    }));
                  }}
                  className="
                    flex-1
                    h-full
                    outline-none
                    typo-body-sm
                    text-[#202020]
                  "
                />
                <button
                  onClick={handleNicknameSave}
                  disabled={
                    !account.nickname.trim() ||
                    account.nickname.length > MAX_NICKNAME_LENGTH
                  }
                  className="
                    w-[115px]
                    px-[18px]
                    py-1
                    rounded-full
                    bg-[#202020]
                    text-white
                    disabled:bg-[#DDD]
    disabled:text-[#999]
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
        </div>

        <SettingsInputItem
          label="휴대전화"
          value={account.phone}
          buttonText="휴대폰 번호 변경"
          to="/settings/phone"
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
          value={MASKED_PASSWORD}
          buttonText="비밀번호 변경"
          to="/settings/password"
        />
      </div>
    </section>
  );
}
