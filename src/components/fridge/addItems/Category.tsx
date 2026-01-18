import React from "react";

interface CategoryProps {
  image: string;
  name: string;
  isSelected?: boolean;
  onSelect?: () => void;
}

const Category: React.FC<CategoryProps> = ({
  image,
  name,
  isSelected = false,
  onSelect,
}) => {
  return (
    <button
      onClick={onSelect}
      className={`min-w-12 w-fit h-12 rounded-[6px] items-center justify-center px-3
        ${isSelected ? "bg-gray-200" : "bg-white"}`}
    >
      <div className="flex flex-col gap-[2px] items-center justify-center">
        <img src={image} className="w-[18px] h-[18px]" />
        <span className="font-semibold text-[10px] text-zinc-500 whitespace-nowrap leading-none">
          {name}
        </span>
      </div>
    </button>
  );
};

export default Category;
