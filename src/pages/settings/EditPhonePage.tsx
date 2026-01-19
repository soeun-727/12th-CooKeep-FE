// src/pages/settings/EditPhonePage.tsx
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import checkIcon from "../../assets/signup/check.svg";
import Button from "../../components/ui/Button";
import PhoneVerifySection from "../../components/settings/sections/PhoneVerifySection";

export default function EditPhonePage() {
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#FAFAFA]">
      <PhoneVerifySection onSuccess={() => setIsSuccess(true)} />

      {/* 성공 오버레이 */}
      {isSuccess && (
        <div className="absolute inset-0 z-50 flex justify-center bg-[#FAFAFA]">
          <div className="w-[361px] flex flex-col items-center">
            <p
              className="
    w-full
    typo-result-title
    pt-[295px]
    pb-[18px]
  "
            >
              휴대폰 번호 변경 완료
            </p>

            <img src={checkIcon} alt="성공" className="w-[40px] h-[40px]" />

            <Button
              size="L"
              variant="black"
              className="mt-[48px]"
              onClick={() => navigate("/login")}
            >
              로그인하기
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
