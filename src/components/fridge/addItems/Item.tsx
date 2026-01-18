import React from "react";

interface ItemProps {
  image: string;
  name: string;
  isSelected?: boolean;
  onSelect?: () => void;
}

const Item: React.FC<ItemProps> = ({
  image,
  name,
  isSelected = false,
  onSelect,
}) => {
  return (
    <button
      onClick={onSelect}
      className={`w-[90px] h-[90px] rounded-[6px] border items-center justify-center px-4
        ${isSelected ? "bg-[var(--color-green-light)] border-[var(--color-green-deep)]" : "bg-white border-[#D1D1D1]"}`}
    >
      <div className="flex flex-col gap-[2px] items-center justify-center">
        <img src={image} className="w-12 h-12" />
        <span className="typo-caption font-bold whitespace-nowrap w-[58px]">
          {name}
        </span>
      </div>
    </button>
  );
};

export default Item;
