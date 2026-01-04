import React from "react";

interface SkillButtonProps {
  image: string;
  title: string;
  description: string;
  isSelected?: boolean;
  onClick?: () => void;
}

const SkillButton: React.FC<SkillButtonProps> = ({
  image,
  title,
  description,
  isSelected = false,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-[361px] h-[72px] border-1 rounded-md px-2 ${
        isSelected
          ? "border-[var(--color-green-deep)] bg-[#E6FBEB]"
          : "border-[#D1D1D1] bg-white"
      }`}
    >
      <div className="flex items-center w-full">
        <img className="w-12 h-12 object-contain" src={image} />
        <div className="flex flex-col ml-5 items-start text-left">
          <span className="typo-body1 font-bold">{title}</span>
          <span className="typo-caption">{description}</span>
        </div>
      </div>
    </button>
  );
};

export default SkillButton;
