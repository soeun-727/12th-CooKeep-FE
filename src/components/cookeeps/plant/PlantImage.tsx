import { useCookeepsStore } from "../../../stores/useCookeepsStore";
import { EMPTY_PLANT_IMAGE, PLANT_IMAGES } from "./PlantImages";

export default function PlantImage() {
  const selectedPlant = useCookeepsStore((s) => s.selectedPlant);
  const plantStage = useCookeepsStore((s) => s.plantStage);

  const imageSrc =
    selectedPlant && plantStage >= 1
      ? PLANT_IMAGES[selectedPlant][plantStage]
      : EMPTY_PLANT_IMAGE;

  return (
    <div className="relative w-full h-full">
      <img
        src={imageSrc}
        alt="plant"
        className="w-full h-full object-contain"
      />
    </div>
  );
}
