interface Step {
  order: number;
  description: string;
}

interface Props {
  steps: Step[];
  difficulty: string;
}

export default function RecipeStepSection({ steps }: Props) {
  // 숫자와 공백을 제거하는 함수
  const formatDescription = (text: string) => {
    // 1. 2. 혹은 1) 2) 형태의 시작 패턴을 제거합니다.
    return text.replace(/^\d+[.)\s:-]*/, "").trim();
  };

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
            {/* <div className="flex items-center justify-center w-[30px] h-[20px] px-[12px] rounded-full bg-[#202020] text-white text-[12px] font-semibold leading-[16px] flex-shrink-0">
              {step.order}
            </div> */}

            {/* 레시피 설명 */}
            {/* <p className="text-[#202020] typo-body-sm max-w-[289px]">
              {formatDescription(step.description)}
            </p>
          </div>
        ))} */}
            {/* h-5(20px) 대신 텍스트 line-height와 같은 h-[22px] 사용 */}
            <div className="flex items-center justify-center w-[30px] h-[22px] px-3 rounded-full bg-[#202020] text-white text-[12px] font-semibold leading-none shrink-0 mt-[3px]">
              {step.order}
            </div>

            <p className="text-[#202020] typo-body-sm max-w-[289px] leading-[22px]">
              {formatDescription(step.description)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
