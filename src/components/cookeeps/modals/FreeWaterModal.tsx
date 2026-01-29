import Button from "../../ui/Button";
import characterImg from "../../../assets/character/plant_char.svg";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function FreeWaterModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;
  return (
    <div className="absolute inset-0 z-60 flex items-center justify-center">
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* modal */}
      <div className="relative w-[258px] px-7 pt-[35px] pb-[25px] rounded-[10px] bg-white flex flex-col items-center gap-5">
        {/* content */}
        <div className="w-full flex flex-col items-center gap-7">
          <p className="typo-body text-[#202020] text-center whitespace-pre-line">
            씨앗 등록 완료! 🌱{"\n"}
            무료 물주기 1회가 준비되어 있어요
          </p>
          <img src={characterImg} alt="알림 캐릭터" className="w-[85px]" />
        </div>

        {/* buttons */}

        <Button
          variant="green"
          className="!w-[202px] !bg-(--color-green) !font-bold mt-2"
          onClick={onClose}
        >
          지금 물 주러 가기
        </Button>
      </div>
    </div>
  );
}
