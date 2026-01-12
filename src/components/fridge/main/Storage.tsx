//Fridge, Freezer, Pantry items
import plus from "../../../assets/fridge/plus.svg";
import plusDisabled from "../../../assets/fridge/plusDisabled.svg";
import Item from "../items/Item";
import charcter from "../../../assets/fridge/character.svg";
import { useState } from "react";
import type { Ingredient } from "./FridgeTab";
interface StorageProps {
  category: string;
  image: string;
  ingredients: Ingredient[];
}
export default function Storage({
  category,
  image,
  ingredients,
}: StorageProps) {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const isScrollable = ingredients.length >= 3;
  const handleItemClick = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id]
    );
  };
  return (
    <div className="relative w-[393px] min-h-[173px] mx-auto z-0">
      {/* 배경 */}
      <div className="absolute inset-0 -z-10 flex flex-col overflow-hidden">
        <div className="w-full h-[115px] rounded-t-[36px] bg-[#BFC6D740]" />
        <div className="relative bg-[#C8CFE2] h-12">
          <div className="absolute inset-0 flex w-full gap-[6px] items-center justify-center pt-[7px]">
            <div className="w-[114px] h-[26px] rounded-[7px] bg-[#ADB4C766]" />
            <div className="w-[114px] h-[26px] rounded-[7px] bg-[#ADB4C766]" />
            <div className="w-[114px] h-[26px] rounded-[7px] bg-[#ADB4C766]" />
          </div>
        </div>
        <div className="bg-[#ADB4C7] h-[10px]" />
      </div>

      {/* 헤더 */}
      <div className="relative z-10 pl-[22px] pr-[22px] pt-[5px] pb-5">
        <div className="flex justify-between w-full h-10 items-center">
          <div className="flex items-center bg-neutral-800 rounded-[6px] h-[22px] px-2 gap-1 text-white text-3">
            <img src={image} alt="category" className="w-3" />
            <span className="typo-caption">{category}</span>
          </div>

          <div className="flex items-center gap-1 h-10">
            <button
              disabled={!isScrollable}
              className="flex items-center gap-1 group transition-all"
            >
              <span
                className={`typo-caption font-semibold transition-colors ${
                  isScrollable
                    ? "text-[var(--color-green-deep)]"
                    : "text-[#BFC6D7]"
                }`}
              >
                전체보기
              </span>
              <img
                src={isScrollable ? plus : plusDisabled}
                className={`w-3 transition-opacity ${
                  !isScrollable && "opacity-50"
                }`}
                alt="plus"
              />
            </button>
          </div>
        </div>
      </div>

      {/* 아이템 */}
      <div
        className={`relative w-[353px] z-10 mx-auto ${
          ingredients.length > 0 ? "overflow-hidden" : ""
        }`}
      >
        {ingredients.length > 0 ? (
          <div className="flex gap-[6px] overflow-x-auto no-scrollbar">
            {ingredients.map((item) => (
              <div key={item.id} className="flex-shrink-0">
                <Item
                  name={item.name}
                  expiration={item.expiration}
                  image={item.image}
                  isSelected={selectedIds.includes(item.id)}
                  onClick={() => handleItemClick(item.id)}
                />
              </div>
            ))}
            <div className="w-4 flex-shrink-0" />
          </div>
        ) : (
          //데이터가 없는 경우
          <div className="flex flex-col items-center gap-3 mt-[-9px]">
            <img src={charcter} className="w-[45.6px] " />
            <span className="typo-caption text-[#7A8093]">
              재료를 등록해주세요
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
