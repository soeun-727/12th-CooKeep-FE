import PlantImage from "./PlantImage";
import WaterToast from "./WaterToast";
// 이거 크기 1대1로 반응형으로 했는데 별로면 수정....

interface PlantBackgroundProps {
  showToast: boolean;
  message: string;
}

export default function PlantBackground({
  showToast,
  message,
}: PlantBackgroundProps) {
  return (
    <section className="relative w-full flex justify-center">
      <div
        className="
        relative
          w-full
          max-w-[450px]
          aspect-square
          flex-shrink-0
        "
      >
        <PlantImage />

        <WaterToast message={message} isVisible={showToast} />
      </div>
    </section>
  );
}
