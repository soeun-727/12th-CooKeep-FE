// src/pages/settings/EditPasswordPage.tsx
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import TextField from "../../components/ui/TextField";
import Button from "../../components/ui/Button";

import pwIcon from "../../assets/login/key.svg";
import pwImage from "../../assets/login/pw.svg";
import openpwImage from "../../assets/signup/openpw.svg";
import checkIcon from "../../assets/signup/check.svg";

export default function EditPasswordPage() {
  const navigate = useNavigate();

  // 기존 비밀번호
  const [currentPassword, setCurrentPassword] = useState("");
  const [isCurrentPwValid, setIsCurrentPwValid] = useState<boolean | null>(
    null
  );

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const MAX_ATTEMPTS = 5;
  const [currentPwFailCount, setCurrentPwFailCount] = useState(0);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // 새 비밀번호
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const [error, setError] = useState<string | undefined>();
  const [isSuccess, setIsSuccess] = useState(false);

  const validatePassword = (pw: string) =>
    pw.length >= 8 && /[a-zA-Z]/.test(pw) && /[0-9]/.test(pw);

  const isPasswordValid = password ? validatePassword(password) : false;
  const isPasswordMatch =
    password && confirmPassword ? password === confirmPassword : false;

  const isFormValid =
    isCurrentPwValid === true && isPasswordValid && isPasswordMatch;

  const handleSubmit = async () => {
    if (!isFormValid) return;

    try {
      await changePasswordAPI(currentPassword, password);
      setIsSuccess(true);
    } catch {
      setError("비밀번호 변경 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FAFAFA]">
      <div className="pt-[241px] w-[352px] mx-auto">
        <div className="typo-h1">비밀번호 변경</div>

        {/* 기존 비밀번호 */}
        <div className="mt-[12px]">
          <TextField
            type={showCurrentPassword ? "text" : "password"}
            value={currentPassword}
            onChange={(value) => {
              setCurrentPassword(value);
              setIsCurrentPwValid(null);
              setError(undefined);
            }}
            onBlur={async () => {
              if (!currentPassword) return;
              if (isCurrentPwValid === true) return;

              if (currentPwFailCount >= MAX_ATTEMPTS) {
                setShowAuthModal(true);
                return;
              }

              const isValid = await verifyCurrentPasswordAPI(currentPassword);

              if (!isValid) {
                const next = currentPwFailCount + 1;
                setCurrentPwFailCount(next);
                setIsCurrentPwValid(false);

                if (next >= MAX_ATTEMPTS) {
                  setShowAuthModal(true);
                }
              } else {
                setIsCurrentPwValid(true);
                setCurrentPwFailCount(0);
              }
            }}
            placeholder="기존 비밀번호"
            autoComplete="current-password"
            errorMessage={
              isCurrentPwValid === false
                ? `기존 비밀번호가 일치하지 않습니다 (${currentPwFailCount}/${MAX_ATTEMPTS})`
                : undefined
            }
            successMessage={
              isCurrentPwValid === true
                ? "기존 비밀번호가 확인되었습니다"
                : undefined
            }
            leftIcon={<img src={pwIcon} alt="" />}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                <img
                  src={
                    isCurrentPwValid === true
                      ? checkIcon
                      : showCurrentPassword
                      ? openpwImage
                      : pwImage
                  }
                  alt=""
                />
              </button>
            }
          />
        </div>

        {/* 새 비밀번호 */}
        <div className="mt-[5px]">
          <TextField
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={setPassword}
            placeholder="영문, 숫자 포함 8자 이상의 새 비밀번호"
            autoComplete="new-password"
            errorMessage={
              password && !isPasswordValid
                ? "영문, 숫자 포함 8자 이상의 비밀번호를 사용해 주세요"
                : undefined
            }
            successMessage={
              password && isPasswordValid
                ? "사용 가능한 비밀번호입니다"
                : undefined
            }
            leftIcon={<img src={pwIcon} alt="새 비밀번호 아이콘" />}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                <img
                  src={
                    password && confirmPassword && isPasswordMatch
                      ? checkIcon
                      : showPassword
                      ? openpwImage
                      : pwImage
                  }
                  alt="비밀번호 토글"
                />
              </button>
            }
          />
        </div>

        {/* 새 비밀번호 확인 */}
        <div className="mt-[5px]">
          <TextField
            type={showPasswordConfirm ? "text" : "password"}
            value={confirmPassword}
            onChange={setConfirmPassword}
            placeholder="비밀번호 확인"
            autoComplete="new-password"
            errorMessage={
              confirmPassword && !isPasswordMatch
                ? "비밀번호가 일치하지 않습니다"
                : undefined
            }
            successMessage={
              confirmPassword && isPasswordMatch
                ? "비밀번호가 일치합니다"
                : undefined
            }
            leftIcon={<img src={pwIcon} alt="비밀번호 확인 아이콘" />}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
              >
                <img
                  src={
                    password && confirmPassword && isPasswordMatch
                      ? checkIcon
                      : showPasswordConfirm
                      ? openpwImage
                      : pwImage
                  }
                  alt="비밀번호 확인 토글"
                />
              </button>
            }
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center mt-[8px]">{error}</p>
        )}

        <Button
          size="L"
          variant="green"
          disabled={!isFormValid}
          onClick={handleSubmit}
          className="mt-[31px]"
        >
          비밀번호 재설정
        </Button>
      </div>

      {showAuthModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40">
          <div
            className="
    w-[254px]
    flex flex-col items-center
    pt-[35px] px-[28px] pb-[25px]
    gap-[16px]
    rounded-[10px]
    bg-white
  "
          >
            <p className="typo-body-sm text-[#111] text-center self-stretch">
              비밀번호가 5회 일치하지 않았어요.
              <br />
              본인인증을 진행해 주세요
            </p>

            <Button
              size="S"
              variant="black"
              className="!w-full"
              onClick={() => {
                setShowAuthModal(false);
                navigate("/settings/verify");
              }}
            >
              본인인증
            </Button>
          </div>
        </div>
      )}

      {/* 성공 오버레이 */}
      {isSuccess && (
        <div className="absolute inset-0 z-50 flex justify-center bg-[#FAFAFA]">
          <div className="w-[361px] flex flex-col items-center">
            <p className="typo-result-title pt-[295px] pb-[18px]">
              비밀번호 변경 완료
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

// 🔧 예시 API
const changePasswordAPI = async (
  currentPassword: string,
  newPassword: string
) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      console.log("기존:", currentPassword, "새 비밀번호:", newPassword);
      resolve();
    }, 1000);
  });
};

const verifyCurrentPasswordAPI = async (password: string) => {
  return new Promise<boolean>((resolve) => {
    setTimeout(() => {
      // 테스트용: 이 값만 맞다고 가정
      resolve(password === "test1234");
    }, 500);
  });
};
