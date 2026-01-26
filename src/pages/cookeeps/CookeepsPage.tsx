// CookeepsPage.tsx
import { useState } from "react";
import PlantBackground from "../../components/cookeeps/plant/PlantBackground";
import CookeepsHeader from "../../components/cookeeps/header/CookeepsHeader";
import PlantGrowthCard from "../../components/cookeeps/plant/PlantGrowthCard";

export default function CookeepsPage() {
  const [toastVisible, setToastVisible] = useState(false);

  const handleWaterSuccess = () => {
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 5000);
  };

  return (
    <div className="min-h-screen relative">
      <div className="relative">
        <PlantBackground
          showToast={toastVisible}
          message="물 주기에 성공했어요!"
        />
        <CookeepsHeader />
      </div>

      <div className="px-4 space-y-6 pb-24">
        {/* PlantGrowthCard 안에서 WaterButton에 onSuccess 연결 */}
        <PlantGrowthCard onWaterSuccess={handleWaterSuccess} />

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
