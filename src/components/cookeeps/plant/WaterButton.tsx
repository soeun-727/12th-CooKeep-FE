// WaterButton.tsx
import { useState } from "react";
import { useCookeepsStore } from "../../../stores/useCookeepsStore";
import WaterModal from "../modals/WaterModal";

interface WaterButtonProps {
  onSuccess?: () => void; // prop 추가
}

export default function WaterButton({ onSuccess }: WaterButtonProps) {
  const { waterPlant, cookie, plantStage, selectedPlant } = useCookeepsStore();
  const [isModalOpen, setModalOpen] = useState(false);

  const disabled = !selectedPlant || cookie < 10 || plantStage >= 4;

  const { wantsToWater, setWantsToWater } = useCookeepsStore();

  const handleConfirm = () => {
    waterPlant();
    setWantsToWater(false); // 추가 wilteing
    setModalOpen(false);
    if (onSuccess) onSuccess(); // 여기서 toast 실행
  };

  const isModalOpenControlled = wantsToWater || isModalOpen;

  return (
    <>
      <button
        disabled={disabled}
        onClick={() => setModalOpen(true)}
        className={`w-full max-w-[280px] min-w-[211px] h-[40px]
        rounded-full font-bold text-[16px]
        ${
          disabled
            ? "bg-gray-300 text-gray-400"
            : "bg-[#202020] text-[#32E389] shadow active:scale-95"
        }`}
      >
        물 주기 (쿠키 10개 사용)
      </button>

      <WaterModal
        isOpen={isModalOpenControlled}
        onClose={() => {
          setModalOpen(false);
          setWantsToWater(false);
        }}
        onConfirm={handleConfirm}
      />
    </>
  );
}
