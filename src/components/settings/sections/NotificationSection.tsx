import { useState } from "react";
import SettingsToggleItem from "../components/SettingsToggleItem";
import ConfirmModal from "../../ui/ConfirmModal";

export default function NotificationSection() {
  const [enabled, setEnabled] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleToggle = (next: boolean) => {
    if (!enabled && next) {
      setShowConfirm(true);
      return;
    }
    setEnabled(next);
  };

  const handleConfirm = () => {
    setEnabled(true);
    setShowConfirm(false);
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  return (
    <section className="px-4 mt-[26px]">
      <SettingsToggleItem
        label="마케팅 PUSH 수신 동의"
        checked={enabled}
        onChange={handleToggle}
      />

      {showConfirm && (
        <ConfirmModal
          message="마케팅 수신에 동의하시겠습니까?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </section>
  );
}
