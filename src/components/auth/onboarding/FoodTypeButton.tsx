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
      <div className="flex flex-col items-center w-full">
        <img className="w-12 h-12 object-contain" src={displayImage} />
        <span
          className={`typo-caption font-bold ${
            isSelected ? "text-[var(--color-green-deep)]" : "text-[#A1A1A1]"
          }`}
        >
          {title}
        </span>
      </div>
    </button>
  );
};

export default FoodTypeButton;
