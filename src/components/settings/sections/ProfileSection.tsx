// src/pages/settings/sections/ProfileSection.tsx

import { useEffect, useState } from "react";
import SettingsInputItem from "../components/SettingsInputItem";

const MASKED_PASSWORD = "********";

type ProfileInfo = {
  nickname: string;
  phone: string;
  email: string;
};

export default function ProfileSection() {
  const [account, setAccount] = useState<ProfileInfo>({
    nickname: "",
    phone: "",
    email: "",
  });

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

  return (
    <section className="px-4">
      <div className="flex flex-col gap-[22px]">
        <SettingsInputItem
          label="닉네임"
          value={account.nickname}
          buttonText="닉네임 변경"
          to="/settings/nickname"
        />

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
