import icon from "../../assets/Frame 36.svg";
import logo from "../../assets/Logo.png";
import Button from "../ui/Button";

export default function Initial() {
  return (
    <div className="relative min-h-screen bg-[var(--color-green-deep)]">
      {/* 상단 텍스트 영역 */}
      <img
        src={icon}
        alt="Frame 아이콘"
        className="w-[18.5px] absolute top-[140px] left-[165px]"
      />
      <div className="absolute top-[155px] left-[32px]">
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
      <div className="absolute top-[220px] left-[32px]">
        <img src={logo} alt="로고" className="w-[255px]" />
      </div>

      {/* 버튼 영역 */}
      <div
        className="
          absolute
          top-[678px]
          left-1/2
          -translate-x-1/2
        "
      >
        <Button size="L">시작하기</Button>
      </div>

      {/* 로그인 영역 */}
      <div
        className="
          absolute
          top-[750px]
          left-1/2
          -translate-x-1/2
          flex
          items-center
          gap-[16px]
        "
      >
        <span className="typo-caption text-white/80">이미 계정이 있나요?</span>
        <button className="typo-caption text-white font-semibold underline underline-offset-4">
          로그인
        </button>
      </div>
    </div>
  );
}
