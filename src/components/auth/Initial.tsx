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
      <div className="absolute top-[3px] left-0 right-0 flex justify-center pointer-events-none z-0">
        <img src={confetti} className="w-86" />
      </div>
      {/* 상단 텍스트 영역 */}
      <div className="flex flex-col mt-[86px] items-center">
        <h1 className="text-[19px] font-semibold flex gap-1">
          <span className="text-(--color-green-deep)">재료 관리</span>
          <span className="text-neutral-800">부터,</span>
          <span className="text-(--color-green-deep)">요리 기록</span>
          <span className="text-neutral-800">까지!</span>
        </h1>
      </div>

      {/* 로고 */}
      <div className="flex flex-col items-center mt-[23px]">
        <span className="typo-caption">1인 가구 요리 루틴 플랫폼</span>
        <img src={mainLogo} alt="로고" className="w-[218px]" />
      </div>

      {/* 애니메이션 */}
      <div className="relative mt-27 w-full overflow-hidden">
        <div className="flex h-50 items-end animate-roll-left w-max flex-nowrap mb-26">
          {INFINITE_CHAR.map((char, index) => (
            <img
              key={index}
              src={char}
              alt={`character-${index}`}
              className="mr-8 w-[791.5px] min-w-[791.5px] object-contain flex-shrink-0"
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-3">
        {/* 버튼 영역 */}
        <div className="">
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
