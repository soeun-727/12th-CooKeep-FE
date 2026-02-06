// src/pages/settings/components/SettingsInputItem.tsx
import { useNavigate } from "react-router-dom";

type SettingsInputItemProps = {
  label: string;
  value: string;
  buttonText: string;
  to: string;
  disabled?: boolean;
};

export default function SettingsInputItem({
  label,
  value,
  buttonText,
  to,
  disabled = false,
}: SettingsInputItemProps) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-2 h-[80px] w-full">
      {/* label */}
      <span className="typo-body text-[#202020] px-3">{label}</span>

      {/* input-like box */}
      <div
        className="
          flex
          items-center
          justify-between
          w-full
          h-[44px]
          px-3
          border
          border-[#DDD]
          rounded-[6px]
        "
      >
        {/* value */}
        <span className="typo-body-sm text-[#AEAEAE]">{value}</span>

        {/* button */}
        <button
          type="button"
          onClick={() => navigate(to)}
          disabled={disabled}
          className={`
            flex
            items-center
            justify-center
            w-[115px]
            px-[18px]
            py-1
            rounded-full
            transition-colors
            typo-caption
            font-medium
            ${
              disabled
                ? "bg-[#DDD] text-[#999] cursor-not-allowed" // 비활성화 스타일
                : "bg-[#202020] text-white cursor-pointer active:bg-[#404040]" // 활성화 스타일
            }
          `}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
