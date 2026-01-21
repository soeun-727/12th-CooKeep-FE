import React, { useEffect, useRef, useState } from "react";
import memoIcon from "../../../assets/fridge/memo.svg";
import renameIcon from "../../../assets/recipe/rename.svg";
import coldIcon from "../../../assets/fridge/fridge.svg";
import frozenIcon from "../../../assets/fridge/freezer.svg";
import roomIcon from "../../../assets/fridge/pantry.svg";
import deleteIcon from "../../../assets/fridge/delete.svg";
import { useAddIngredientStore } from "../../../stores/useAddIngredientStore";
import type { MasterItem } from "../../../stores/useAddIngredientStore";

interface DetailedItemProps extends MasterItem {}
const STORAGE_ICONS: Record<string, string> = {
  냉장: coldIcon,
  냉동: frozenIcon,
  상온: roomIcon,
};

const DetailedItem: React.FC<DetailedItemProps> = (item) => {
  const { updateItemDetail, toggleItem } = useAddIngredientStore();
  const [isMemoEditing, setIsMemoEditing] = useState(false);
  const memoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isMemoEditing && memoInputRef.current) {
      memoInputRef.current.focus();
    }
  }, [isMemoEditing]);

  const currentIcon = STORAGE_ICONS[item.storageType || "냉장"] || coldIcon;

  const handleChange = (details: Partial<MasterItem>) => {
    updateItemDetail(item.id, details);
  };
  return (
    <div className="relative w-[345px] h-[198px] rounded-[6px] bg-[#FFFFFF] shadow-[0px_1px_8.2px_-2px_rgba(17,17,17,0.25)]">
      <div className="flex p-6 gap-4">
        <div className="flex flex-col items-start w-[99px] h-34">
          <div className="w-20 h-20 rounded-[6px] items-justify-center border border-[#D1D1D1]  p-[14px]">
            <img src={item.image} className="w-13" />
          </div>
          <span className="typo-caption w-[95px] pt-[10px] text-left truncate font-bold px-[2px]">
            {item.name}
          </span>
          <div className="w-full mt-2 min-h-[20px] flex items-center justify-center pl-[2px]">
            {isMemoEditing ? (
              <input
                ref={memoInputRef}
                type="text"
                value={item.memo || ""}
                onChange={(e) => handleChange({ memo: e.target.value })}
                onBlur={() => setIsMemoEditing(false)}
                onKeyDown={(e) => e.key === "Enter" && setIsMemoEditing(false)}
                placeholder="메모를 남겨주세요"
                className="w-full text-[10px] text-zinc-600 border-b border-green-500 outline-none pb-0.5 text-center"
              />
            ) : (
              <div
                onClick={() => setIsMemoEditing(true)}
                className="flex cursor-pointer group w-full items-center"
              >
                <span
                  className={`text-[10px] flex-1 w-full ${item.memo ? "text-stone-300" : "text-zinc-400"}`}
                >
                  {item.memo || "메모를 남겨주세요"}
                </span>
                <img
                  src={memoIcon}
                  alt="edit memo"
                  className="w-6 flex-shrink-0 opacity-60 group-hover:opacity-100 transition-opacity"
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col items-start w-44 h-38 gap-2 typo-caption">
          <div className="flex gap-3 items-center">
            <span className="w-[42px]">보관장소</span>
            <div className="flex w-[59px] h-8 px-2 gap-1 bg-black rounded-[6px] items-center">
              <img
                src={currentIcon}
                alt={item.storageType}
                className="h-[15px]"
              />
              <span className="text-[var(--color-green-deep)]">
                {item.storageType || "냉장"}
              </span>
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <span className="w-[42px]">유통기한</span>
            <div className="flex w-[122px] h-8 border border-[#D1D1D1] rounded-[6px] items-center justify-between px-[10px] py-3">
              <span className="w-[58px] h-4">
                {item.expiration || "2026.01.20"}
              </span>
              <img src={renameIcon} className="w-3" />
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <span className="w-[42px]">수량</span>
            <div className="flex w-[66px] h-8 border border-[#D1D1D1] rounded-[6px] items-center justify-between px-[10px] py-3">
              <span className="w-[58px] h-4">{item.quantity || 1}</span>
              <img src={renameIcon} className="w-3" />
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <span className="w-[42px]">단위</span>
            <div className="flex w-[66px] h-8 border border-[#D1D1D1] rounded-[6px] items-center justify-between px-[10px] py-3">
              <span className="w-[58px] h-4">{item.unit || "개"}</span>
              <img src={renameIcon} className="w-3" />
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => toggleItem(item)}
        className="absolute bottom-1 right-1 z-30 p-1 transition-all active:scale-90"
      >
        <img alt="deleteButton" src={deleteIcon} className="w-10" />
      </button>
    </div>
  );
};

export default DetailedItem;
