import TextField from "../../ui/TextField";
import phoneIcon from "../../../assets/login/phone.svg";
import pwIcon from "../../../assets/login/key.svg";
import pwImage from "../../../assets/login/pw.svg";
import Button from "../../ui/Button";
import { useAuthStore } from "../../../stores/useAuthStore";
import { useNavigate } from "react-router-dom";

export default function LoginMain() {
  const navigate = useNavigate();
  const {
    phoneNumber,
    setPhoneNumber,
    password,
    setPassword,
    isValidPhone,
    isValidPW,
    canLogin,
    login,
    isSubmitting,
  } = useAuthStore();
  const handleLogin = async () => {
    const result = await login();

    if (result?.success) {
      if (result.isFirst) {
        navigate("/onboarding"); // 최초 로그인 시
      } else {
        navigate("/main"); // 기존 사용자 시
      }
    }
  };
  return (
    <>
      <div className="pt-[187px] w-[352px] mx-auto">
        <div className="typo-h1">로그인</div>

        {/* 입력 영역 */}
        <div className="flex flex-col mt-[12px]">
          <TextField
            value={phoneNumber}
            placeholder="휴대폰 번호(- 없이 숫자만 입력)"
            onChange={setPhoneNumber}
            errorMessage={
              phoneNumber.length > 0 && !isValidPhone
                ? "잘못된 휴대폰 번호입니다"
                : undefined
            }
            leftIcon={<img src={phoneIcon} alt="" />}
          />

          <div className="mt-[5px]" />

          <TextField
            value={password}
            placeholder="영문, 숫자 포함 8자 이상의 비밀번호"
            type="password"
            onChange={setPassword}
            errorMessage={
              password.length > 0 && !isValidPW
                ? "잘못된 비밀번호입니다"
                : undefined
            }
            leftIcon={<img src={pwIcon} alt="" />}
            rightIcon={<img src={pwImage} alt="" />}
          />
        </div>
      </div>

      {/* 버튼 */}
      <div className="mt-[48px] flex justify-center">
        <Button
          size="L"
          disabled={!canLogin || isSubmitting}
          onClick={handleLogin}
        >
          로그인
        </Button>
      </div>
    </>
  );
}
