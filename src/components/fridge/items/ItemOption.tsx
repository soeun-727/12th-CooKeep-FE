import eaten from "../../../assets/fridge/eaten.svg";
import thrown from "../../../assets/fridge/thrown.svg";
import { useIngredientStore } from "../../../stores/useIngredientStore";

export default function ItemOption() {
  const { selectedIds, deleteSelected } = useIngredientStore();

  if (selectedIds.length === 0) return null;

  const innerShadow = "inset_0_1px_6.7px_0_rgba(17,17,17,0.2)";

  return (
    <div className="flex flex-col fixed bottom-[90px] left-1/2 -translate-x-1/2 z-40 w-[393px]">
      <div className="flex bg-white border-[0.5px] border-[#D1D1D1] h-11">
        <button
          onClick={() => deleteSelected("eaten")}
          className={`flex-1 active:bg-[var(--color-green-light)] active:shadow-[${innerShadow}] transition-all`}
        >
          <div className="flex gap-[3px] items-center justify-center h-11">
            <span className="typo-body2">다 먹었어요</span>
            <img src={eaten} className="w-4" alt="eaten" />
          </div>
        </button>

        <button
          onClick={() => deleteSelected("thrown")}
          className={`flex-1 border-x-[0.5px] border-[#D1D1D1] active:bg-[var(--color-green-light)] active:shadow-[${innerShadow}] transition-all`}
        >
          <div className="flex gap-[3px] items-center justify-center h-11">
            <span className="typo-body2">버렸어요</span>
            <img src={thrown} className="w-4" alt="thrown" />
          </div>
        </button>

        <button
          onClick={() => console.log("레시피 추천 로직")}
          className={`flex-1 active:bg-[var(--color-green-light)] active:shadow-[${innerShadow}] transition-all`}
        >
          <div className="flex gap-[3px] items-center justify-center h-11 typo-body2">
            AI 레시피 추천받기
          </div>
        </button>
      </div>

      <div className="w-[393px] h-[5px] bg-gradient-to-b from-[#737373]/80 to-[#D9D9D9]/80" />
    </div>
  );
}
