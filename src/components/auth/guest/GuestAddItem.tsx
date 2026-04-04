import { useState } from "react";
import header from "../../../assets/guest/add_header.svg";
import Button from "../../ui/Button";

interface GuestAddItemProps {
  onNext: () => void;
}

export default function GuestAddItem({ onNext }: GuestAddItemProps) {
  const [isDimmed, setIsDimmed] = useState(false);

  return (
    /* 1. h-[100dvh]: AppLayout 안에서 자식이 가질 수 있는 최대 높이를 강제합니다.
       2. relative: 하단 absolute 버튼의 기준점이 됩니다.
    */
    <div className="relative w-full h-[100dvh] flex flex-col items-center bg-[#FAFAFA] overflow-hidden">
      {isDimmed && (
        <div className="fixed inset-0 z-10 bg-neutral-900/50 transition-opacity animate-fadeIn left-1/2 -translate-x-1/2 max-w-[450px] w-full" />
      )}

      {/* 헤더 영역 */}
      <div className="shrink-0 flex justify-center">
        <img src={header} alt="header" />
      </div>

      {/* 그리드 영역 */}
      <div
        className="flex-1 w-full flex justify-center items-start mt-4 overflow-y-auto"
        onClick={() => setIsDimmed(true)}
      >
        <div className="w-[294px] pb-40 pointer-events-none">그리드 영역</div>
      </div>

      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute pb-[62px] bottom-[calc(32px+env(safe-area-inset-bottom))] flex justify-center w-full z-20"
      >
        <div className="flex gap-[6px] w-[300px]">
          <div className="flex-1">
            <Button
              size="S"
              variant="black"
              className="!w-full opacity-50 pointer-events-none"
            >
              선택 초기화
            </Button>
          </div>
          <div className="flex-1">
            <Button
              size="S"
              variant="green"
              onClick={onNext}
              className="!w-full shadow-lg"
            >
              재료 추가하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
