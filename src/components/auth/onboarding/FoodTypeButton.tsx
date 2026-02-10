import React from "react";

interface FoodTypeButtonProps {
  image: string;
  grayImage: string;
  title: string;
  isSelected?: boolean;
  onClick?: () => void;
}

const FoodTypeButton: React.FC<FoodTypeButtonProps> = ({
  image,
  grayImage,
  title,
  isSelected = false,
  onClick,
}) => {
  const displayImage = isSelected ? image : grayImage;
  return (
    <button
      onClick={onClick}
      className={`w-[90px] h-[90px] border rounded-md px-2 ${
        isSelected
          ? "border-[var(--color-green-deep)] bg-[#E6FBEB]"
          : "border-[#D1D1D1] bg-white"
      }`}
    >
      <div className="flex flex-col items-center w-full gap-[7px]">
        <img className="w-12 h-12 object-contain" src={displayImage} />
        <span
          className={`typo-caption !font-semibold ${
            isSelected ? "text-black" : "text-[#7D7D7D]"
          }`}
        >
          {title}
        </span>
      </div>
    </button>
  );
};

export default FoodTypeButton;
