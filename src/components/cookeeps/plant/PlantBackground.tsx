// src/components/cookeeps/plant/PlantBackground.tsx
import PlantImage from "./PlantImage";

export default function PlantBackground() {
  return (
    <section className="relative h-72 bg-gradient-to-b from-green-200 to-[#FFFDF7]">
      <div className="h-full flex items-center justify-center">
        <PlantImage />
      </div>
    </section>
  );
}
