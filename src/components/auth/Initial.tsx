import icon from "../../assets/initial/icon.svg";
import logo from "../../assets/initial/Logo.png";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";

export default function Initial() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-green-deep)]">
      {/* 상단 텍스트 영역 */}
      <img
        src={icon}
        alt="Frame 아이콘"
        className="w-[18.5px] mt-[138px] ml-[169px]"
      />
      <div className="ml-8">
        <h1 className="typo-h1 flex gap-1">
          <span className="text-neutral-800">재료</span>
          <span className="text-white">관리부터,</span>
        </h1>

        <h1 className="typo-h1 flex gap-1">
          <span className="text-neutral-800">레시피 추천</span>
          <span className="text-white">까지!</span>
        </h1>
      </div>

      {/* 로고 */}
      <div className="mt-3 ml-8">
        <img src={logo} alt="로고" className="w-[255px]" />
      </div>

      <div className="flex flex-col items-center justify-center gap-4">
        {/* 버튼 영역 */}
        <div className="mt-[385px]">
          <Button size="L" onClick={() => navigate("/login")}>
            시작하기
          </Button>
        </div>

        {/* 로그인 영역 */}
        <div className="flex gap-4">
          <span className="typo-caption text-white">
            아직 계정이 없으신가요?
          </span>
          <button
            onClick={() => navigate("/signup")}
            className="typo-caption text-white"
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}
