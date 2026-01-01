import React from "react";

interface TextFieldProps {
  label?: string;
  value: string;
  placeholder?: string;
  type?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  errorMessage?: string;
}

const TextField = ({
  label,
  value,
  placeholder,
  type = "text",
  onChange,
  disabled = false,
  errorMessage,
}: TextFieldProps) => {
  return (
    <div className="w-[361px]">
      {label && (
        <label className="block text-sm font-medium mb-1">{label}</label>
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
    ${errorMessage ? "border-[#D91F1F]" : "border-[#DDDDDD]"}
  `}
      />

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
    </div>
  );
};

export default TextField;
