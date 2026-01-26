import CookeepsHeader from "../../components/cookeeps/header/CookeepsHeader";
import PlantBackground from "../../components/cookeeps/plant/PlantBackground";
import PlantGrowthBar from "../../components/cookeeps/plant/PlantGrowthBar";
import WaterButton from "../../components/cookeeps/plant/WaterButton";

export default function CookeepsPage() {
  return (
    <div className="min-h-screen bg-[#FFFDF7]">
      {/* 상단: 식물 배경 + 헤더 */}
      <div className="relative">
        <PlantBackground />
        <CookeepsHeader />
      </div>

      {/* 하단 콘텐츠 */}
      <div className="px-4 space-y-6 pb-24">
        <WaterButton />
        {/* 📊 성장 상태바 */}
        <PlantGrowthBar />

        <div className="bg-white p-4 rounded-xl shadow">
          이번 주 식물 돌봄 TOP3
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          이번 주 인기 레시피
        </div>
      </div>
    </div>
  );
}
