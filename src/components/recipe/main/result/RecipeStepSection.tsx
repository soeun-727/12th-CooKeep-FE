interface Step {
  order: number;
  description: string;
}

interface Props {
  steps: Step[];
  difficulty: string;
}

export default function RecipeStepSection({ steps }: Props) {
  return (
    <div className="flex flex-col items-start gap-[10px] w-full">
      {/* 제목 */}
      <span className="typo-body-sm text-[#7D7D7D] self-stretch">레시피</span>

      {/* 단계 리스트 */}
      <div className="flex flex-col items-start gap-[8px] w-full">
        {steps.map((step) => (
          <div
            key={step.order}
            className="flex justify-start items-start w-full gap-3"
          >
            {/* 번호 */}
            <div className="flex items-center justify-center w-[30px] h-[20px] px-[12px] rounded-full bg-[#202020] text-white text-[12px] font-semibold leading-[16px] flex-shrink-0">
              {step.order}
            </div>

            {/* 레시피 설명 */}
            <p className="text-[#202020] typo-body-sm max-w-[289px]">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
