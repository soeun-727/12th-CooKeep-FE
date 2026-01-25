import { useState, type TouchEvent } from "react";
import Button from "../../ui/Button";
import {
  cookingChar,
  earth,
  plant,
  tree,
  seedling,
  seeds,
} from "../../../assets";

interface Props {
  isOpen?: boolean;
}

const ONBOARDING_DATA = [
  {
    id: 1,
    img: earth,
    text: "요리는 나를 위한 선택이자,\n결국엔 지구를 위한 선택이기도 해요",
  },
  {
    id: 2,
    img: cookingChar,
    text: "집에 있는 재료로 요리하고\nCooKeep에 기록하면\n쿠키를 받고, 식물을 키울 수 있어요",
  },
  {
    id: 3,
    img: (
      <div className="flex gap-[4px] items-end pb-1">
        {[
          { src: seeds, label: "씨앗" },
          { src: seedling, label: "새싹" },
          { src: plant, label: "성장" },
          { src: tree, label: "완성" },
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center gap-[3px]">
            <img src={item.src} className="w-[37px]" alt={item.label} />
            <span className="text-[8px] font-medium text-stone-500">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    ),
    text: "식물을 다 키우면 새로운 씨앗과\n쿠키 선물이 기다리고 있어요!",
  },
];

export default function OnboardingModal({
  isOpen: initialOpen = false,
}: Props) {
  const [isVisible, setIsVisible] = useState(initialOpen);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  if (!isVisible) return null;

  const isLastStep = currentIndex === ONBOARDING_DATA.length - 1;
  const handleClose = () => {
    setIsVisible(false);
    setCurrentIndex(0); // 닫을 때 인덱스 초기화
  };
  const handleTouchStart = (e: TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    // 50px 이상 밀었을 때 페이지 이동
    if (diff > 50 && currentIndex < ONBOARDING_DATA.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else if (diff < -50 && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
    setTouchStart(null);
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center">
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={handleClose} />

      {/* modal */}
      <div className="relative overflow-hidden w-[258px] h-[260px] rounded-[10px] bg-white flex flex-col items-center justify-center shadow-xl gap-4">
        {/* slider content */}
        <div
          className="flex transition-transform duration-300 ease-in-out w-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {ONBOARDING_DATA.map((item) => (
            <div
              key={item.id}
              className="min-w-full flex flex-col items-center justify-center px-[25px] pt-[30px] gap-4"
            >
              <div className="h-[50px] flex items-center justify-center">
                {typeof item.img === "string" ? (
                  <img
                    src={item.img}
                    className="max-w-full max-h-full object-contain"
                    alt="step"
                  />
                ) : (
                  item.img
                )}
              </div>
              <p className="typo-body2 text-center whitespace-pre-wrap leading-tight">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        {/* Footer: Dots & Button */}
        <div className="flex flex-col items-center gap-4 pb-[25px] w-full">
          {/* Dots */}
          <div className="flex gap-2">
            {ONBOARDING_DATA.map((_, index) => (
              <div
                key={index}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  currentIndex === index ? "bg-zinc-500" : "bg-stone-300"
                }`}
              />
            ))}
          </div>

          {/* Button */}
          {isLastStep ? (
            <div className="px-[25px]">
              <Button
                variant="green"
                className="!w-[202px]"
                onClick={handleClose}
              >
                확인
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
