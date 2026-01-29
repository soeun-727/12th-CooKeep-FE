import { useCookeepsStore } from "../../../stores/useCookeepsStore";
import {
  EMPTY_PLANT_IMAGE,
  PLANT_IMAGES,
  type PlantStage,
} from "./PlantImages";

interface PlantImageProps {
  overridePlantStage?: number;
}

export default function PlantImage({ overridePlantStage }: PlantImageProps) {
  const selectedPlant = useCookeepsStore((s) => s.selectedPlant);
  const plantStage = useCookeepsStore((s) => s.plantStage);

  const stageToShow = overridePlantStage ?? plantStage;

  const imageSrc =
    selectedPlant && stageToShow >= 1 && stageToShow <= 4
      ? PLANT_IMAGES[selectedPlant][stageToShow as PlantStage]
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
