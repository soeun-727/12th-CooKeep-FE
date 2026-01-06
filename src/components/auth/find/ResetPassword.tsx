import React, { useState } from "react";
import TextField from "../../ui/TextField";
import Button from "../../ui/Button";
import { useNavigate, useLocation } from "react-router-dom";
import { useSignupStore } from "../../../stores/useSignupStore";

// 아이콘
import pwIcon from "../../../assets/login/key.svg";
import pwImage from "../../../assets/login/pw.svg";
import openpwImage from "../../../assets/signup/openpw.svg";
import checkIcon from "../../../assets/signup/check.svg";

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const phone = location.state?.phone || useSignupStore.getState().phone;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [isSuccess, setIsSuccess] = useState(false); // ✅ 성공 팝업 상태

  const validatePassword = (pw: string) =>
    password.length >= 8 && /[a-zA-Z]/.test(password) && /[0-9]/.test(pw);

  const isPasswordValid = password ? validatePassword(password) : false;
  const isPasswordMatch =
    password && confirmPassword ? password === confirmPassword : false;

  const getPasswordIcon = () => {
    if (password && confirmPassword && isPasswordMatch) return checkIcon;
    return showPassword ? openpwImage : pwImage;
  };

  const getPasswordConfirmIcon = () => {
    if (password && confirmPassword && isPasswordMatch) return checkIcon;
    return showPasswordConfirm ? openpwImage : pwImage;
  };

  const isFormValid = isPasswordValid && isPasswordMatch;

  const handleSubmit = async () => {
    if (!validatePassword(password)) {
      setError("비밀번호는 8자리 이상, 영문+숫자+특수문자를 포함해야 합니다.");
      return;
    }
    if (password !== confirmPassword) {
      setError("비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    try {
      await resetPasswordAPI(phone, password);
      setError(undefined);
      setIsSuccess(true); // ✅ 변경 완료 팝업 표시
    } catch (e) {
      setError("비밀번호 변경 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="pt-[200px] w-[352px] mx-auto flex flex-col gap-6 relative">
      <div className="typo-h1 text-center">비밀번호 재설정</div>

      <TextField
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={setPassword}
        placeholder="영문, 숫자 포함 8자 이상의 비밀번호"
        errorMessage={
          password && !isPasswordValid
            ? "영문, 숫자 포함 8자 이상의 비밀번호를 사용해 주세요"
            : undefined
        }
        successMessage={
          password && isPasswordValid ? "사용 가능한 비밀번호입니다" : undefined
        }
        leftIcon={<img src={pwIcon} alt="비밀번호 아이콘" />}
        rightIcon={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="flex items-center justify-center h-full"
          >
            <img src={getPasswordIcon()} alt="비밀번호 토글 아이콘" />
          </button>
        }
      />

      <TextField
        type={showPasswordConfirm ? "text" : "password"}
        value={confirmPassword}
        onChange={setConfirmPassword}
        placeholder="비밀번호 확인"
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
            className="flex items-center justify-center h-full"
          >
            <img
              src={getPasswordConfirmIcon()}
              alt="비밀번호 확인 토글 아이콘"
            />
          </button>
        }
      />

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      <Button
        type="submit"
        size="L"
        disabled={!isFormValid}
        onClick={handleSubmit}
        className={`mt-[8px] w-full ${
          isFormValid
            ? "!bg-[#1FC16F] text-white"
            : "bg-[#C3C3C3] text-[#7D7D7D] cursor-not-allowed"
        }`}
      >
        비밀번호 변경
      </Button>

      {/* 비밀번호 변경 완료 팝업 */}
      {isSuccess && (
        <div className="fixed z-50 left-1/2 top-1/3 -translate-x-1/2 bg-white rounded-[10px] p-6 flex flex-col items-center gap-4 shadow-lg w-[280px]">
          <p className="text-center text-[16px] font-medium">
            비밀번호 변경 완료
          </p>
          <img src={checkIcon} alt="성공 아이콘" className="w-12 h-12" />
          <Button
            size="L"
            onClick={() => navigate("/login")}
            className="w-full bg-[#1FC16F] text-white"
          >
            로그인하기
          </Button>
        </div>
      )}
    </div>
  );
}

// 예시 API 함수
const resetPasswordAPI = async (phone: string, newPassword: string) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      console.log(`전화번호: ${phone}, 새 비밀번호: ${newPassword}`);
      resolve();
    }, 1000);
  });
};
