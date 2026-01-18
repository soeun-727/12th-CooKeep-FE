// src/pages/settings/components/SettingsInputItem.tsx
import { useNavigate } from "react-router-dom";

type SettingsInputItemProps = {
  label: string;
  value: string;
  buttonText: string;
  to: string;
};

export default function SettingsInputItem({
  label,
  value,
  buttonText,
  to,
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
          className="
            flex
            items-center
            justify-center
            w-[115px]
            px-[18px]
            py-1
            rounded-full
            bg-[#202020]
            text-white
            typo-caption
            font-medium
          "
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
