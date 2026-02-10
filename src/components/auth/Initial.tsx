import { mainLogo, confetti } from "../../assets";
import chars from "../../assets/onboarding/Frame 781.svg";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";

const CHAR = [chars];
const INFINITE_CHAR = [...CHAR, ...CHAR];

export default function Initial() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center bg-[#FAFAFA] h-full">
      <div className="absolute top-12 left-0 right-0 flex justify-center pointer-events-none z-0">
        <img src={confetti} className="w-[326px]" />
      </div>
      {/* 상단 텍스트 영역 */}
      <div className="flex flex-col mt-34 items-center">
        <h1 className="typo-h2 flex gap-1">
          <span className="text-neutral-800">재료 관리</span>
          <span className="text-(--color-green-deep)">부터,</span>
        </h1>
        <h1 className="typo-h2 flex gap-1">
          <span className="text-neutral-800">레시피 추천</span>
          <span className="text-(--color-green-deep)">까지!</span>
        </h1>
      </div>

      {/* 로고 */}
      <div className="mt-[42px]">
        <img src={mainLogo} alt="로고" className="w-41" />
      </div>

      {/* 애니메이션 */}
      <div className="relative flex mt-13 w-full overflow-hidden">
        <div className="flex h-50 items-end animate-roll-left">
          {INFINITE_CHAR.map((char, index) => (
            <img
              key={index}
              src={char}
              alt={`character-${index}`}
              className="w-[791.5px] flex-shrink-0 px-4"
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-3">
        {/* 버튼 영역 */}
        <div className="mt-25">
          <Button variant="green" size="L" onClick={() => navigate("/login")}>
            시작하기
          </Button>
        </div>
        {/* 로그인 영역 */}
        <div className="flex gap-4 mb-[34px]">
          <span className="typo-caption text-zinc-500">
            아직 계정이 없으신가요?
          </span>
          <button
            onClick={() => navigate("/signup")}
            className="typo-caption text-zinc-500"
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}
