//온보딩 완료
import temp from "../../../assets/temporary-image.png";
import Button from "../../ui/Button";
export default function Last() {
  return (
    <>
      <div className="flex flex-col items-center">
        <h1 className="typo-h1 mt-[166px]">답변 완료!</h1>
        <h1 className="typo-h1">쿠킵하러 떠나볼까요</h1>
        <div className="typo-body1 text-[var(--color-green-deep)] mt-[10px]">
          답변은 앞으로의 AI 레시피 추천에 반영돼요
        </div>
        <img src={temp} className="w-[184px] mt-[122px]" />
      </div>
      <div className="fixed bottom-0 mb-[34px] left-1/2 -translate-x-1/2">
        <Button>시작하기</Button>
      </div>
    </>
  );
}
