import { useState } from "react";
import TextField from "../../ui/TextField";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";

// 아이콘
import pwIcon from "../../../assets/login/key.svg";
import pwImage from "../../../assets/login/pw.svg";
import openpwImage from "../../../assets/signup/openpw.svg";
import checkIcon from "../../../assets/signup/check.svg";
import { useFindPasswordStore } from "../../../stores/useFindPasswordStore";

export default function ResetPassword() {
  const navigate = useNavigate();

  const { phone, reset } = useFindPasswordStore();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [isSuccess, setIsSuccess] = useState(false);
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
      setIsSuccess(true);
      reset(); // 플로우 종료 → store 초기화
    } catch {
      setError("비밀번호 변경 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="pt-[241px] w-[352px] mx-auto">
      <div className="typo-h1">비밀번호 변경하기</div>
      <div className="mt-[12px]">
        <TextField
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={setPassword}
          placeholder="영문, 숫자 포함 8자 이상의 비밀번호"
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
      </div>

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
              className="flex items-center justify-center h-full"
            >
              <img
                src={getPasswordConfirmIcon()}
                alt="비밀번호 확인 토글 아이콘"
              />
            </button>
          }
        />
      </div>

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      <Button
        type="submit"
        size="L"
        variant="green"
        disabled={!isFormValid}
        onClick={handleSubmit}
        className="mt-[31px]"
      >
        비밀번호 재설정
      </Button>

      {/* AppLayout 영역 전체를 덮는 팝업 */}
      {isSuccess && (
        <div className="absolute inset-0 z-50 flex justify-center bg-[#FAFAFA]">
          <div className="w-[361px] flex flex-col items-center">
            <p className="typo-h1 text-[#202020] text-center font-bold text-[28px] leading-[36px] pt-[241px] pb-[18px]">
              비밀번호 변경 완료
            </p>
            {/*중앙정렬 안하고 피그마 기준으로 pt-[241px] 이걸로 맞춤*/}

            <img
              src={checkIcon}
              alt="성공 아이콘"
              className="w-[40px] h-[40px]"
            />
            <Button
              size="L"
              variant="black"
              onClick={() => navigate("/login")}
              className="mt-[48px]"
            >
              로그인하기
            </Button>
          </div>
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
