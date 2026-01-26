import { useCookeepsStore } from "../../../stores/useCookeepsStore";
import { EMPTY_PLANT_IMAGE, PLANT_IMAGES } from "./PlantImages";

export default function PlantImage() {
  const { selectedPlant, plantStage } = useCookeepsStore();

  // 선택 전
  if (!selectedPlant) {
    return (
      <div className="flex flex-col items-center">
        <img src={EMPTY_PLANT_IMAGE} alt="선택 전" className="w-40" />
        <p className="mt-2 text-sm text-gray-600">
          키우고 싶은 식물을 선택해 주세요 🌱
        </p>
      </div>
    );
  }

  // 선택 후
  return (
    <div className="flex justify-center">
      <img
        src={PLANT_IMAGES[selectedPlant][plantStage]}
        alt={`${selectedPlant} ${plantStage}단계`}
        className="w-52"
      />
    </div>
  );
}
