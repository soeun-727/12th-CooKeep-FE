// src/components/cookeeps/plant/preloadPlantImages.ts
import { EMPTY_PLANT_IMAGE, PLANT_IMAGES } from "./PlantImages";

export function preloadPlantImages() {
  const images = [
    ...Object.values(PLANT_IMAGES).flatMap((stages) => Object.values(stages)),
    EMPTY_PLANT_IMAGE,
  ];

  images.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}
