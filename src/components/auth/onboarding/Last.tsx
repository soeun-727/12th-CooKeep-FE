//온보딩 완료
import temp from "../../../assets/temporary-image.png";
import Button from "../../ui/Button";

interface LastProps {
  onStart: () => void;
}

export default function Last({ onStart }: LastProps) {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center">
        <h1 className="typo-h1 mt-[112px]">답변 완료!</h1>
        <h1 className="typo-h1">목표는 매주 자유롭게</h1>
        <h1 className="typo-h1">변경할 수 있어요</h1>
        <div className="typo-body1 text-[var(--color-green-deep)] font-bold mt-[10px]">
          입력한 답변을 바탕으로 AI 레시피를 추천해드려요
        </div>
        <img src={temp} className="w-[184px] mt-[86px]" />

        <div className="mt-[201px]">
          <Button size="L" onClick={onStart}>
            시작하기
          </Button>
        </div>
      </div>
    </>
  );
}
