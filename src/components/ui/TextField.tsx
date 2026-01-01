import React from "react";

interface TextFieldProps {
  label?: string;
  value: string;
  placeholder?: string;
  type?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  errorMessage?: string;
  successMessage?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const TextField = ({
  label,
  value,
  placeholder,
  type = "text",
  onChange,
  disabled = false,
  errorMessage,
  successMessage,
  leftIcon,
  rightIcon,
}: TextFieldProps) => {
  return (
    <div className="w-[361px]">
      {label && (
        <label className="block text-sm font-medium mb-1">{label}</label>
      )}

      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            {leftIcon}
          </div>
        )}

        <input
          type={type}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className={`
    w-full h-[48px]
    border
    rounded-[6px]
    px-3 py-2
    disabled:bg-[#ECECEC]
    ${leftIcon ? "pl-10" : ""}
        ${rightIcon ? "pr-10" : ""}
    ${
      errorMessage
        ? "border-[#D91F1F]"
        : successMessage
        ? "border-[#1FA43C]"
        : "border-[#DDDDDD]"
    }
  `}
        />

        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {rightIcon}
          </div>
        )}
      </div>

      {errorMessage && (
        <p
          className="
    mt-1
    pl-2
    text-[10px]
    leading-[14px]
    font-normal
    not-italic
    text-[#D91F1F]
  "
        >
          {errorMessage}
        </p>
      )}
      {!errorMessage && successMessage && (
        <p className="mt-1 pl-2 text-[10px] leading-[14px] text-[#1FA43C]">
          {successMessage}
        </p>
      )}
    </div>
  );
};

export default TextField;
