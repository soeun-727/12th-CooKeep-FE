// CookeepsPage.tsx
import { useState } from "react";
import PlantBackground from "../../components/cookeeps/plant/PlantBackground";
import CookeepsHeader from "../../components/cookeeps/header/CookeepsHeader";
import PlantGrowthCard from "../../components/cookeeps/plant/PlantGrowthCard";
import WeeklyTop3Section from "../../components/cookeeps/ranking/WeeklyTop3Section";
import { top3Users } from "../../constants/mocktop3Users";
import WeeklyRecipeSection from "../../components/cookeeps/recipe/WeeklyRecipeSection";
import { topRecipes } from "../../constants/mockTopRecipes";

// 스크롤 고정하는거 빼자고 했던거 같은데 피그마에는 고정이 있길래 해봤는데 이상해서 그냥 스크롤 고정없는거로 했습니다.

export default function CookeepsPage() {
  const [toastVisible, setToastVisible] = useState(false);

  const handleWaterSuccess = () => {
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 5000);
  };

  return (
    <div className="h-[100dvh] overflow-y-auto no-scrollbar">
      <div className="relative">
        <PlantBackground
          showToast={toastVisible}
          message="물 주기에 성공했어요!"
        />
        <CookeepsHeader />
      </div>

      <div className="px-4 space-y-6 pb-7">
        <PlantGrowthCard onWaterSuccess={handleWaterSuccess} />

        <WeeklyTop3Section users={top3Users} />

        <WeeklyRecipeSection topRecipes={topRecipes} />
      </div>
    </div>
  );
}
