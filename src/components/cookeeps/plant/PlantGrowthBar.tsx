// src/components/cookeeps/plant/PlantGrowthBar.tsx

import { useCookeepsStore } from "../../../stores/useCookeepsStore";

export default function PlantGrowthBar() {
  const { plantStage, selectedPlant } = useCookeepsStore();

  // 식물 선택 전엔 안 보여줌
  if (!selectedPlant) return null;

  const progressPercent = (plantStage / 4) * 100;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs text-gray-500">
        <span>성장 단계</span>
        <span>{plantStage} / 4</span>
      </div>

      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-green-500 transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}
