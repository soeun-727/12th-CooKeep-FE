import eaten from "../../../assets/fridge/eaten.svg";
import thrown from "../../../assets/fridge/thrown.svg";
interface ItemOptionProps {
  isVisible: boolean;
}

export default function ItemOption({ isVisible }: ItemOptionProps) {
  if (!isVisible) return null;

  return (
    <div
      className="
      fixed bottom-[95px] left-1/2 -translate-x-1/2 
      z-40 flex w-[393px] h-11 
      bg-white shadow-[0_-4px_10px_rgba(0,0,0,0.05)]
      border-t border-gray-100"
    >
      <button>
        <div className="flex gap-[3px] items-center justify-center bg-white w-[131px] h-11">
          <span className="typo-body2">다 먹었어요</span>
          <img src={eaten} className="w-4" />
        </div>
      </button>
      <button>
        <div className="flex gap-[3px] items-center justify-center bg-white w-[131px] h-11">
          <span className="typo-body2">버렸어요</span>
          <img src={thrown} className="w-4" />
        </div>
      </button>
      <button>
        <div className="flex gap-[3px] items-center justify-center bg-white w-[131px] h-11 typo-body2">
          AI 레시피 추천받기
        </div>
      </button>
    </div>
  );
}
