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
      type="button"
      className={`w-full h-[72px] border rounded-md p-3 ${
        isSelected
          ? "border-[var(--color-green-deep)] bg-[#E6FBEB]"
          : "border-[#D1D1D1] bg-white"
      }`}
    >
      <div className="flex items-center w-full gap-5">
        <img className="w-12 h-12 object-contain" src={image} />
        <div className="flex flex-col items-start text-left">
          <span className="typo-body !font-semibold">{title}</span>
          <span className="typo-caption">{description}</span>
        </div>
      </div>
    </button>
  );
};

export default SkillButton;
