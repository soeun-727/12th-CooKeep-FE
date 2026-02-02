import Button from "../../ui/Button";
import character from "../../../assets/character/congrats_char.svg";

interface Props {
  onConfirm: () => void; // 쿠키받기
  onCancel: () => void; // 그냥 닫기
}

export default function UploadCompleteModal({ onConfirm, onCancel }: Props) {
  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onCancel}
    >
      <div
        className="flex flex-col items-center gap-2 w-[240px] px-[28px] pt-[35px] pb-[25px] bg-white rounded-[10px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center justify-center gap-4 self-stretch">
          <img
            src={character}
            className="w-[84.922px] h-[90px]"
            alt="congrats"
          />

          <p className="typo-label">오늘의 레시피 등록 완료!</p>

          <Button
            size="S"
            variant="green"
            className="!w-[184px]"
            onClick={onConfirm}
          >
            쿠키받기
          </Button>
        </div>
      </div>
    </div>
  );
}
