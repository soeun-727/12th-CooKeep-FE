import { useEffect, useState } from "react";
import PlantShortcutTooltip from "./PlantShortcutTooltip";

export default function CookeepsHeader() {
  const [showTooltip, setShowTooltip] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <header className="absolute top-0 left-0 right-0 h-14 flex items-center justify-between px-4 z-10">
      {/* 왼쪽 */}
      <div className="font-bold text-lg">쿠킵스</div>

      {/* 오른쪽 영역 */}
      <div className="flex items-center gap-3">
        {/* 쿠키 */}
        <button className="bg-white px-3 py-1 rounded-full shadow text-sm">
          🍪 0
        </button>

        {/* 키운 식물 보기 버튼 */}
        <button className="bg-white px-3 py-1 rounded-full shadow text-sm">
          🌱 내 식물
        </button>

        {/* 툴팁 */}
        <PlantShortcutTooltip visible={showTooltip} />

        {/* 설정 */}
        <button className="text-xl">⚙️</button>
      </div>
    </header>
  );
}
