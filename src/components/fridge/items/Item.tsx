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
      className={`w-[114px] h-20 rounded-[6px] border ${
        isSelected
          ? "border-[var(--color-green-deep)] bg-[var(--color-green-light)]"
          : "border-[#D1D1D1] bg-white"
      }`}
    >
      <div className="flex items-end justify-between h-full">
        <div className="flex flex-col items-start">
          <span className="pl-[11px] pt-[10px] typo-caption">{name}</span>
          <span className="pl-[11px] text-stone-300 text-[10px] font-['Pretendard'] font-semibold leading-[16px]">
            {expiration}
          </span>
          <img src={isSelected ? checkOn : check} className="pl-1" />
        </div>
        <img className="object-contain pb-1 pr-[3px]" src={image} alt={name} />
      </div>
    </button>
  );
};

export default Item;
