import header from "../../../assets/guest/back_header.svg";
import DetailedItem from "../../fridge/addItems/DetailedItem";
import milk from "../../../assets/guest/milk.svg";
import { useState } from "react";
import Button from "../../ui/Button";

interface Props {
  onNext: () => void;
}

export default function GuestDetails({ onNext }: Props) {
  const [isDimmed, setIsDimmed] = useState(false);

  const guestItem = {
    id: 1,
    name: "우유",
    image: milk,
    category: "냉장",
    quantity: 1,
    unit: "개",
    expiryDate: "2026-12-31",
    dDay: 1,
    createdAt: Date.now(),
    categoryId: 1,
    type: "냉장" as any,
    storageType: "냉장",
    expiration: "2026-12-31",
    onIncrease: () => {},
    onDecrease: () => {},
    onDelete: () => {},
  };

  return (
    <div className="relative flex flex-col items-center w-full h-dvh bg-[#FAFAFA] overflow-hidden">
      {isDimmed && (
        <div className="fixed inset-0 z-10 bg-neutral-900/50 transition-opacity animate-fadeIn left-1/2 -translate-x-1/2 max-w-[450px] w-full" />
      )}

      <div
        className="w-full h-full flex flex-col items-center"
        onClick={() => setIsDimmed(true)}
      >
        <div className="flex justify-center shrink-0">
          <img src={header} alt="header" className="w-[361px]" />
        </div>

        <div
          className="mt-[43px] w-full flex justify-center px-5"
          onClick={(e) => e.stopPropagation()}
        >
          <DetailedItem {...(guestItem as any)} />
        </div>
        <div className="absolute pb-[62px] bottom-[calc(32px+env(safe-area-inset-bottom))] flex justify-center w-full z-20">
          <Button size="L" variant="black" onClick={onNext}>
            등록 완료
          </Button>
        </div>
      </div>
    </div>
  );
}
