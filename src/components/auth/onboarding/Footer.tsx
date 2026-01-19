import Button from "../../ui/Button";
//지금 하단 고정되어 있어요
interface FooterProps {
  onNext: () => void;
  onPrev: () => void;
  onSkip: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  isValid: boolean;
}

export default function Footer({
  onNext,
  onPrev,
  onSkip,
  isFirstStep,
  isLastStep,
  isValid,
}: FooterProps) {
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 pb-[34px]">
      <div className="w-[361px] mx-auto flex flex-col items-center gap-2">
        <Button
          size="S"
          className="bg-[var(--color-green-deep)]"
          onClick={() => isValid && onNext()}
          disabled={!isValid}
        >
          {isLastStep ? "쿠킵 시작하기" : "다음"}
        </Button>

        <Button
          size="S"
          className="bg-gray-300"
          onClick={() => !isFirstStep && onPrev()}
          disabled={isFirstStep}
        >
          이전
        </Button>

        <button className="typo-caption text-gray-500" onClick={onSkip}>
          질문 건너뛰기
        </button>
      </div>
    </div>
  );
}
