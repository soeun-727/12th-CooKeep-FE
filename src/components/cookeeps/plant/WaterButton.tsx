// src/components/cookeeps/plant/WaterButton.tsx
import { useCookeepsStore } from "../../../stores/useCookeepsStore";

export default function WaterButton() {
  const { waterPlant, cookie, plantStage, selectedPlant } = useCookeepsStore();

  const disabled = !selectedPlant || cookie < 10 || plantStage >= 4;

  return (
    <button
      onClick={waterPlant}
      disabled={disabled}
      className={`w-full py-3 rounded-xl text-white font-semibold transition
        ${
          disabled
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-green-500 active:scale-95"
        }`}
    >
      💧 물 주기 (-10 쿠키)
    </button>
  );
}
