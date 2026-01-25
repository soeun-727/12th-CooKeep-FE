interface Props {
  selectedIngredients: string[];
  requiredIngredients?: string[];
  substitutions?: {
    original: string;
    replacement: string;
  }[];
}

export default function RecipeIngredientSection({
  selectedIngredients,
  requiredIngredients = [],
  substitutions = [],
}: Props) {
  return (
    <div className="flex flex-col items-start gap-[36px] w-full">
      <div className="flex flex-col items-start gap-4 w-full">
        {/* 내 재료 섹션 */}
        <div className="flex flex-col items-start gap-2 w-full">
          <span className="typo-body-sm text-[#202020]">내 재료:</span>
          <div className="flex flex-wrap items-start gap-[5px]">
            {selectedIngredients.map((item, idx) => (
              <span
                key={idx}
                className="flex items-center justify-center h-[20px] px-[12px] rounded-full bg-[#1FC16F] text-white text-[12px] leading-[16px]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* 추가로 필요한 재료 섹션 */}
        {requiredIngredients.length > 0 && (
          <div className="flex flex-col items-start gap-2 w-full">
            <span className="typo-body-sm text-[#202020]">추가 재료:</span>
            <div className="flex flex-wrap items-start gap-[5px]">
              {requiredIngredients.map((item, idx) => (
                <span
                  key={idx}
                  className="flex items-center justify-center h-[20px] px-[12px] rounded-full bg-[#EBEBEB] text-[#7D7D7D] text-[12px] leading-[16px]"
                >
                  {item}
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
                className="flex justify-between items-start self-stretch w-full"
              >
                {/* original pill */}
                <div className="flex px-3 py-[2px] justify-center items-center gap-2 rounded-[100px] bg-[#EBEBEB]">
                  <span className="text-[#7D7D7D] text-center text-[12px] font-semibold leading-[16px]">
                    {item.original}
                  </span>
                </div>

                {/* replacement text */}
                <span className="w-[255px] text-[#202020] typo-body-sm">
                  {item.replacement}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
