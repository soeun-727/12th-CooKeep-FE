import { type Ingredient } from "../../../stores/useIngredientStore";
import header from "../../../assets/guest/fridge_header.svg";
import Storage from "../../fridge/main/Storage";
import fridgeIcon from "../../../assets/fridge/fridge.svg";
import freezerIcon from "../../../assets/fridge/freezer.svg";
import pantryIcon from "../../../assets/fridge/pantry.svg";
import strawberry from "../../../assets/guest/strawberry.svg";
import egg from "../../../assets/guest/egg.svg";
import noodles from "../../../assets/guest/noodles.svg";
import bagel from "../../../assets/guest/bagel.svg";
import banana from "../../../assets/guest/banana.svg";
import milk from "../../../assets/guest/milk.svg";
import FAB from "../../../assets/guest/fab.svg";
import notice from "../../../assets/guest/fab_2.svg";
import { useState } from "react";
import Button from "../../ui/Button";

interface Props {
  onNext: () => void;
  mode?: "fridge" | "recipe";
}

export default function GuestFridge({ onNext, mode = "fridge" }: Props) {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isDimmed, setIsDimmed] = useState(false);
  const clickableIds = [1, 2, 4, 6];
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
    ...(mode === "recipe"
      ? [
          {
            id: 6,
            name: "베이글",
            category: "냉동" as const,
            dDay: 6,
            image: bagel,
            ...defaultProps,
          },
        ]
      : ([] as Ingredient[])),
  ];
  const handleItemClick = (id: number) => {
    if (mode !== "recipe") return;
    if (!clickableIds.includes(id)) return;

    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id],
    );
  };

  const getProcessedIngredients = (category: "냉장" | "냉동" | "상온") => {
    return guestIngredients
      .filter((i) => i.category === category)
      .map((i) => ({
        ...i,
        className:
          mode === "recipe" && isDimmed
            ? clickableIds.includes(i.id)
              ? "relative !z-[100] bg-white rounded-[6px]"
              : "pointer-events-none"
            : "",
        isSelected: selectedIds.includes(i.id),
      }));
  };

  return (
    <div className="relative w-full h-[100dvh]">
      {isDimmed && (
        <div className="fixed inset-0 z-90 bg-neutral-900/50 transition-opacity animate-fadeIn left-1/2 -translate-x-1/2 max-w-[450px] w-full" />
      )}
      <div
        className="flex flex-col w-full gap-7"
        onClick={() => setIsDimmed(true)}
      >
        <img src={header} />
        <div className={`flex flex-col gap-[10px] w-full relative`}>
          <Storage
            category="냉장"
            image={fridgeIcon}
            ingredients={getProcessedIngredients("냉장")}
            onItemClick={handleItemClick}
          />
          <Storage
            category="냉동"
            image={freezerIcon}
            ingredients={getProcessedIngredients("냉동")}
            onItemClick={handleItemClick}
          />
          <Storage
            category="상온"
            image={pantryIcon}
            ingredients={getProcessedIngredients("상온")}
            onItemClick={handleItemClick}
          />
        </div>
      </div>
      {mode === "fridge" ? (
        <div className="absolute flex flex-col items-end bottom-35 z-[110] right-[31px]">
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
      ) : (
        <div className="fixed bottom-[34px] left-1/2 -translate-x-1/2 z-[110]">
          <Button
            size="L"
            variant="black"
            disabled={selectedIds.length === 0}
            onClick={onNext}
          >
            선택 완료
          </Button>
        </div>
      )}
    </div>
  );
}
