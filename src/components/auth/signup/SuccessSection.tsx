import Button from "../../ui/Button";
import tempImage from "../../../assets/temporary-image.png"; // 임시 이미지
import { useNavigate } from "react-router-dom";

export default function SuccessSection() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-start animate-fade-in">
      {/* 상단 간격 */}
      <div className="mt-[166px] flex flex-col items-center gap-[10px] w-[361px] text-center">
        <h1 className="typo-h1 text-[28px] leading-[36px] font-bold text-center">
          반가워요! 오늘부터 지속 가능한 요리 루틴을 만들어볼까요?
        </h1>

        <p className="typo-button text-[var(--color-green-deep)] text-center">
          쿠킵과 함께 냉장고 속 재료부터 채워봐요
        </p>
      </div>

      {/* 이미지 */}
      <img
        src={tempImage}
        alt="임시"
        className="mt-[122px] w-[184px] h-[167px]"
      />

      {/* 버튼 */}
      <div className="fixed bottom-0 mb-[34px] -translate-x-1/2 left-1/2">
        <Button
          size="L"
          className="w-[361px]"
          onClick={() => navigate("/login")}
        >
          시작하기
        </Button>
      </div>
    </div>
  );
}
