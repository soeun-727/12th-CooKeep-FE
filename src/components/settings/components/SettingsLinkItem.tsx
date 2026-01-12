// src/pages/settings/components/SettingsLinkItem.tsx
import { useNavigate } from "react-router-dom";

type SettingsLinkItemProps = {
  label: string;
  to: string;
};

export default function SettingsLinkItem({ label, to }: SettingsLinkItemProps) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(to)}
      className="
        flex justify-center items-center
        w-full max-w-[164px]
        pt-[7px] pb-[13px]
        rounded-[10px]
        bg-[var(--color-green-deep)]
        text-white
        typo-body
      "
    >
      {label}
    </button>
  );
}
