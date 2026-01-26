import { useCookeepsStore } from "../../../stores/useCookeepsStore";
import { EMPTY_PLANT_IMAGE, PLANT_IMAGES } from "./PlantImages";

export default function PlantImage() {
  const { selectedPlant, plantStage } = useCookeepsStore();

  const imageSrc = selectedPlant
    ? PLANT_IMAGES[selectedPlant][plantStage]
    : EMPTY_PLANT_IMAGE;

  return (
    <img src={imageSrc} alt="plant" className="w-full h-full object-contain" />
  );
}
