import { type Ingredient } from "../../../stores/useIngredientStore";
import header from "../../../assets/guest/fridge_header.svg";
import Storage from "../../fridge/main/Storage";
import fridgeIcon from "../../../assets/fridge/fridge.svg";
import freezerIcon from "../../../assets/fridge/freezer.svg";
import pantryIcon from "../../../assets/fridge/pantry.svg";
import strawberry from "../../../assets/guest/strawberry.svg";
import egg from "../../../assets/guest/egg.svg";
import noodles from "../../../assets/guest/noodles.svg";
import banana from "../../../assets/guest/banana.svg";
import milk from "../../../assets/guest/milk.svg";
import FAB from "../../../assets/guest/fab.svg";
import notice from "../../../assets/guest/fab_2.svg";
import { useState } from "react";

interface Props {
  onNext: () => void;
}

export default function GuestFridge({ onNext }: Props) {
  const defaultProps = {
    quantity: 1,
    unit: "개",
    expiryDate: "2026-12-31",
    createdAt: Date.now(),
  };
  const guestIngredients: Ingredient[] = [
    {
      id: 1,
      name: "우유",
      category: "냉장",
      dDay: 1,
      image: milk,
      ...defaultProps,
    },
    {
      id: 2,
      name: "딸기",
      category: "냉장",
      dDay: 3,
      image: strawberry,
      ...defaultProps,
    },

    {
      id: 3,
      name: "계란",
      category: "냉장",
      dDay: 21,
      image: egg,
      ...defaultProps,
    },
    {
      id: 4,
      name: "바나나",
      category: "상온",
      dDay: 6,
      image: banana,
      ...defaultProps,
    },
    {
      id: 5,
      name: "소면",
      category: "상온",
      dDay: 10,
      image: noodles,
      ...defaultProps,
    },
  ];
  const [isDimmed, setIsDimmed] = useState(false);

  return (
    <div className="relative w-full h-[100dvh]">
      {isDimmed && (
        <div
          className="fixed inset-0 z-10 bg-neutral-900/50 transition-opacity animate-fadeIn left-1/2 -translate-x-1/2 max-w-[450px] w-full"
          onClick={() => setIsDimmed(false)}
        />
      )}
      <div
        className="flex flex-col w-full gap-7"
        onClick={() => setIsDimmed(true)}
      >
        <img src={header} />
        <div className="flex flex-col gap-[10px] w-full pointer-events-none">
          <Storage
            category="냉장"
            image={fridgeIcon}
            ingredients={guestIngredients.filter((i) => i.category === "냉장")}
          />
          <Storage category="냉동" image={freezerIcon} ingredients={[]} />
          <Storage
            category="상온"
            image={pantryIcon}
            ingredients={guestIngredients.filter((i) => i.category === "상온")}
          />
        </div>
      </div>
      <div className="absolute flex flex-col items-end bottom-35 z-20 right-[31px]">
        {isDimmed && (
          <img src={notice} alt="click notice" className="w-[270px] -mr-2" />
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="active:scale-95 transition-transform"
        >
          <img src={FAB} alt="add button" />
        </button>
      </div>
    </div>
  );
}
