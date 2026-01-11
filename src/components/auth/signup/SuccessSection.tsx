import Button from "../../ui/Button";
import tempImage from "../../../assets/temporary-image.png"; // 임시 이미지
import { useNavigate } from "react-router-dom";

export default function SuccessSection() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-start py-10 animate-fade-in">
      {/* 상단 간격 */}
      <div className="mt-[112px] flex flex-col items-center gap-[10px] w-[361px] text-center">
        <h1
          className="font-Pretendard font-bold text-[28px] leading-[36px]"
          style={{ color: "#202020" }}
        >
          반가워요! 오늘부터 지속 가능한 요리 루틴을 만들어볼까요?
        </h1>
        <p
          className="font-Pretendard font-bold text-[16px] leading-[24px]"
          style={{ color: "#1FC16F" }}
        >
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
      <div className="mt-[201px] w-full px-[16px]">
        <Button size="L" className="w-full" onClick={() => navigate("/")}>
          시작하기
        </Button>
      </div>
    </div>
  );
}
