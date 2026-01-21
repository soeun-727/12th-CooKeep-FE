import Button from "../../ui/Button";
import type { Ingredient } from "../../../stores/useIngredientStore";
import characterImg from "../../../assets/character/surprised_char_faded.svg";
import { useNavigate } from "react-router-dom";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  items: Ingredient[];
}

export default function ExpiryAlertModal({ isOpen, onClose, items }: Props) {
  const navigate = useNavigate();

  if (!isOpen || items.length === 0) return null;

  const isSingle = items.length === 1;

  const titleText = isSingle
    ? "유통기한이 오늘까지인 재료가 있어요!"
    : "유통기한이 오늘까지인 재료들이 있어요!";

  return (
    <div className="absolute inset-0 z-60 flex items-center justify-center">
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* modal */}
      <div className="relative w-[280px] px-[28px] pt-[35px] pb-[25px] rounded-[10px] bg-white flex flex-col items-center gap-2">
        {/* content */}
        <div className="w-full flex flex-col items-center gap-4">
          <img
            src={characterImg}
            alt="알림 캐릭터"
            className="w-[75px] h-[60px]"
          />

          <p className="typo-body-sm text-[#202020] text-center whitespace-pre-line">
            <span className="font-semibold">{titleText}</span>
            {"\n"}
            지금 요리하면 쿠키 3개를 드려요!
          </p>
        </div>

        {/* buttons */}
        <div className="w-full flex flex-col gap-2 mt-2">
          <Button
            variant="green"
            className="!w-[224px] bg-[#32E389]"
            onClick={() => {
              onClose();
              navigate("/recipe/select");
            }}
          >
            레시피 받고 요리하기
          </Button>

          <Button
            variant="black"
            className="!w-[224px] bg-[#C3C3C3]"
            onClick={onClose}
          >
            나중에 요리할게요
          </Button>
        </div>
      </div>
    </div>
  );
}
