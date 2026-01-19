import Button from "../../ui/Button";
import type { Ingredient } from "../../../stores/useIngredientStore";
import characterImg from "../../../assets/character/surprised_char_faded.svg";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  items: Ingredient[];
  onCook?: () => void;
  onEditExpiry?: () => void;
}

export default function ExpiryAlertModal({
  isOpen,
  onClose,
  items,
  onCook,
  onEditExpiry,
}: Props) {
  if (!isOpen || items.length === 0) return null;

  const mainNames = items
    .slice(0, 2)
    .map((i) => i.name)
    .join(", ");
  const extraCount = items.length - 2;

  const titleText =
    items.length <= 2
      ? `${mainNames}가 오늘까지예요`
      : `${mainNames} 외 ${extraCount}개가\n오늘까지예요`;

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
            onClick={onCook}
            className="!w-[224px] bg-[#32E389]"
          >
            레시피 받고 요리하기
          </Button>

          <Button
            variant="black"
            className="!w-[224px] bg-[#C3C3C3]"
            onClick={onEditExpiry}
          >
            유통기한 수정하기
          </Button>
        </div>
      </div>
    </div>
  );
}
