import { IngredientsJson } from "../../../api/dailyAiRecipe";

interface Props {
  ingredients: IngredientsJson;
}

export default function RecipeDetailIngredientSection({ ingredients }: Props) {
  const { user_ingredients, additional_ingredients, optional_ingredients } =
    ingredients;

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* 필수 재료 */}
      <div>
        <span className="typo-body-sm text-[#202020]">
          내가 가지고 있는 재료
        </span>
        <div className="flex flex-wrap gap-[5px] mt-2">
          {user_ingredients.map((item) => (
            <span
              key={item.name}
              className="h-[20px] px-[12px] rounded-full bg-[#1FC16F] text-white text-[12px]"
            >
              {item.name}
            </span>
          ))}
        </div>
      </div>

      {/* 선택 재료 */}
      {additional_ingredients.length > 0 && (
        <div>
          <span className="typo-body-sm text-[#202020]">
            추가로 필요한 재료
          </span>
          <div className="flex flex-wrap gap-[5px] mt-2">
            {additional_ingredients.map((item) => (
              <span
                key={item.name}
                className="h-[20px] px-[12px] rounded-full bg-[#EBEBEB] text-[#7D7D7D] text-[12px]"
              >
                {item.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 대체 재료 */}
      {optional_ingredients.length > 0 && (
        <div>
          <span className="typo-body-sm text-[#7D7D7D]">
            대체 / 생략 가능 재료
          </span>

          <div className="flex flex-col gap-2 mt-2">
            {optional_ingredients.map((item, idx) => (
              <div key={idx} className="flex items-start w-full">
                {/* 왼쪽: 재료 영역 (폭 고정) */}
                <div className="w-[80px] flex justify-start">
                  <span className="px-3 py-[2px] rounded-full bg-[#EBEBEB] text-[12px] text-[#7D7D7D]">
                    {item.name}
                  </span>
                </div>

                {/* 오른쪽: 설명 */}
                <span className="text-sm text-[#202020] leading-5">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
