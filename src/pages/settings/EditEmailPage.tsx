// src/pages/settings/EditEmailPage.tsx
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import checkIcon from "../../assets/signup/check.svg";
import mailIcon from "../../assets/signup/mail.svg";
import TextField from "../../components/ui/TextField";
import Button from "../../components/ui/Button";

export default function EditEmailPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // 이메일 유효성 체크
  const validateEmail = (value: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(regex.test(value));
  };

  const onSubmit = () => {
    if (!isEmailValid) return;
    // 이메일 변경 성공 처리
    setIsSuccess(true);
  };

  return (
    <div className="relative min-h-screen bg-[#FAFAFA]">
      {/* 이메일 입력 영역 */}
      <div className="pt-[241px]">
        <div className="mx-auto w-[361px]">
          <div className="typo-h1">이메일 주소 변경</div>

          <div className="mt-[12px]">
            <TextField
              value={email}
              onChange={(val) => {
                setEmail(val);
                validateEmail(val);
              }}
              placeholder="새 이메일 주소 입력"
              errorMessage={
                email && !isEmailValid
                  ? "이메일 주소를 다시 확인해 주세요"
                  : undefined
              }
              successMessage={
                email && isEmailValid ? "사용 가능한 이메일입니다" : undefined
              }
              leftIcon={<img src={mailIcon} alt="메일 아이콘" />}
            />
          </div>

          <div className="mt-[31px]">
            <Button
              type="submit"
              size="L"
              disabled={!isEmailValid}
              onClick={onSubmit}
            >
              이메일 주소 변경
            </Button>
          </div>
        </div>
      </div>

      {/* 성공 오버레이 */}
      {isSuccess && (
        <div className="absolute inset-0 z-50 flex justify-center bg-[#FAFAFA]">
          <div className="w-[361px] flex flex-col items-center">
            <p className="typo-result-title w-full pt-[295px] pb-[18px]">
              이메일 주소 변경 완료
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
