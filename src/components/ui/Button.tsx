import React from "react";

type ButtonSize = "S" | "L";

interface ButtonProps {
  children: React.ReactNode;
  size?: ButtonSize;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  children,
  size = "S",
  disabled = false,
  onClick,
  className = "",
  type = "button",
}) => {
  const sizeStyles: Record<ButtonSize, string> = {
    S: "h-[44px] text-sm",
    L: "h-[56px] text-base",
  };

  const baseStyle = `
    w-[361px]
    rounded-[10px]
    flex items-center justify-center
    gap-2
    transition
  `;

  const enabledStyle = "bg-[#111111] text-white";
  const disabledStyle = "bg-[#7D7D7D] text-white cursor-not-allowed";

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        ${baseStyle}
        ${sizeStyles[size]}
        ${disabled ? disabledStyle : enabledStyle}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
