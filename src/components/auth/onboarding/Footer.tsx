import Button from "../../ui/Button";

interface FooterProps {
  onNext: () => void;
  onPrev: () => void;
  onSkip: () => void;
  isFirstStep: boolean;
  isValid: boolean;
}

export default function Footer({
  onNext,
  onPrev,
  onSkip,
  isFirstStep,
  isValid,
}: FooterProps) {
  return (
    <div className="fixed bottom-0 left-0 w-full pb-[34px]">
      <div className="w-[352px] mx-auto flex flex-col items-center gap-2">
        <Button
          size="S"
          className="bg-[var(--color-green-deep)]"
          onClick={() => isValid && onNext()}
          disabled={!isValid}
        >
          다음
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
