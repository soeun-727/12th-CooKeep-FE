interface PlantShortcutTooltipProps {
  visible: boolean;
}

export default function PlantShortcutTooltip({
  visible,
}: PlantShortcutTooltipProps) {
  if (!visible) return null;

  return (
    <div className="absolute top-full mt-2 right-10 bg-black text-white text-xs px-3 py-2 rounded-lg shadow">
      내가 키운 식물을 볼 수 있어요 🌱
    </div>
  );
}
