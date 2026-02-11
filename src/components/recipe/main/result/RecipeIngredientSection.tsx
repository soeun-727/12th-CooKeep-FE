import { IngredientItem } from "../../../../types/aiRecipe";

interface Props {
  selectedIngredients: IngredientItem[];
  requiredIngredients?: IngredientItem[];
  substitutions?: IngredientItem[];
}

export default function RecipeIngredientSection({
  selectedIngredients,
  requiredIngredients = [],
  substitutions = [],
}: Props) {
  const formatIngredient = (item: IngredientItem) => {
    if (!item.quantity) return item.name;

    if (!item.unit) return `${item.name} ${item.quantity}`;

    return `${item.name} ${item.quantity}${item.unit}`;
  };

  return (
    <div className="flex flex-col items-start gap-[36px] w-full">
      <div className="flex flex-col items-start gap-4 w-full">
        {/* 내 재료 섹션 */}
        <div className="flex flex-col items-start gap-2 w-full">
          <span className="typo-body-sm text-[#202020]">
            내가 가지고 있는 재료
          </span>
          <div className="flex flex-wrap items-start gap-[5px]">
            {selectedIngredients.map((item, idx) => (
              <span
                key={idx}
                className="flex items-center justify-center h-[20px] px-[12px] rounded-full bg-[#1FC16F] text-white text-[12px] leading-[16px]"
              >
                {formatIngredient(item)}
              </span>
            ))}
          </div>
        </div>

        {/* 추가로 필요한 재료 섹션 */}
        {requiredIngredients.length > 0 && (
          <div className="flex flex-col items-start gap-2 w-full">
            <span className="typo-body-sm text-[#202020]">
              추가로 필요한 재료
            </span>
            <div className="flex flex-wrap items-start gap-[5px]">
              {requiredIngredients.map((item, idx) => (
                <span
                  key={idx}
                  className="flex items-center justify-center h-[20px] px-[12px] rounded-full bg-[#EBEBEB] text-[#7D7D7D] text-[12px] leading-[16px]"
                >
                  {formatIngredient(item)}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 대체/생략 가능 재료 섹션 */}
      {substitutions.length > 0 && (
        <div className="flex flex-col items-start gap-[10px] self-stretch w-full">
          {/* 섹션 타이틀 */}
          <span className="typo-body-sm text-[#7D7D7D] self-stretch">
            대체/생략 가능 재료
          </span>

          {/* 리스트 */}
          <div className="flex flex-col items-start gap-2 self-stretch w-full">
            {substitutions.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between items-start self-stretch w-full gap-2"
              >
                {/* original pill */}
                <div className="flex px-3 py-[2px] justify-center items-center gap-2 rounded-[100px] bg-[#EBEBEB]">
                  <span className="text-[#7D7D7D] text-center text-[12px] font-semibold leading-[16px] whitespace-nowrap">
                    {formatIngredient(item)}
                  </span>
                </div>

                {/* replacement text */}
                {item.description && (
                  <span className="w-[255px] text-[#202020] typo-body-sm ">
                    {item.description}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
