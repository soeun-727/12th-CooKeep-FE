import React from "react";
import check from "../../../assets/fridge/check.svg";
import checkOn from "../../../assets/fridge/check_selected.svg";

interface ItemProps {
  image: string;
  name: string;
  expiration: string;
  isSelected?: boolean;
  onClick?: () => void;
}

const Item: React.FC<ItemProps> = ({
  image,
  name,
  expiration,
  isSelected = false,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-[114px] h-20 rounded-[6px] border flex flex-col items-start overflow-hidden pl-[11px] ${
        isSelected
          ? "border-[var(--color-green-deep)] bg-[var(--color-green-light)]"
          : "border-[#D1D1D1] bg-white"
      }`}
    >
      <div className="flex flex-col items-start">
        <span className="w-[85px] pt-[10px] text-left truncate typo-caption font-bold block leading-none">
          {name}
        </span>
        <span className="text-stone-300 text-left text-[10px] font-semibold leading-tight whitespace-nowrap mt-0.5">
          {expiration}
        </span>
      </div>

      <div className="flex justify-between items-end w-full flex-1 pb-1.5">
        <img
          src={isSelected ? checkOn : check}
          className="w-9 h-9 object-contain ml-[-6px] flex-shrink-0"
          alt="check"
        />
        <img
          className="w-10 h-10 object-contain flex-shrink-0 -translate-x-[2px] -translate-y-[2px]"
          src={image}
          alt={name}
        />
      </div>
    </button>
  );
};

export default Item;
