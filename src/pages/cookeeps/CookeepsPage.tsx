// CookeepsPage.tsx
import { useState } from "react";
import PlantBackground from "../../components/cookeeps/plant/PlantBackground";
import CookeepsHeader from "../../components/cookeeps/header/CookeepsHeader";
import PlantGrowthCard from "../../components/cookeeps/plant/PlantGrowthCard";
import WeeklyTop3Section from "../../components/cookeeps/ranking/WeeklyTop3Section";
import { top3Users } from "../../constants/mocktop3Users";
import WeeklyRecipeSection from "../../components/cookeeps/recipe/WeeklyRecipeSection";
import { topRecipes } from "../../constants/mockTopRecipes";
import OnboardingModal from "../../components/cookeeps/modals/OnboardingModal";
import PlantSelectModal from "../../components/cookeeps/modals/PlantSelectModal";
import { PLANT_DATA } from "../../constants/plantData";
import SelectedModal from "../../components/cookeeps/modals/SelectedModal";
import WiltingModal from "../../components/cookeeps/modals/WiltingModal";
import WiltedModal from "../../components/cookeeps/modals/WiltedModal";

// 스크롤 고정하는거 빼자고 했던거 같은데 피그마에는 고정이 있길래 해봤는데 이상해서 그냥 스크롤 고정없는거로 했습니다.
type ActiveModal =
  | "onboarding"
  | "select"
  | "selected"
  | "wilting"
  | "wilted"
  | null;

export default function CookeepsPage() {
  const [toastVisible, setToastVisible] = useState(false);
  const [activeModal, setActiveModal] = useState<ActiveModal>("onboarding");
  const [selectedPlant, setSelectedPlant] = useState<
    (typeof PLANT_DATA)[0] | null
  >(null);

  const handleWaterSuccess = () => {
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 5000);
  };
  const handleSelectConfirm = (id: number) => {
    const plant = PLANT_DATA.find((p) => p.id === id);
    if (!plant) return;

    setSelectedPlant(plant);
    setActiveModal("selected");
  };
  const handleFinalStart = () => {
    setActiveModal(null);
    setTimeout(() => {
      setActiveModal("wilting");
    }, 300);
  };
  const handleWiltingClose = () => {
    setActiveModal(null);
    setTimeout(() => {
      setActiveModal("wilted");
    }, 300);
  };

  return (
    <div className="h-[100dvh] overflow-y-auto no-scrollbar">
      {/* 1. 온보딩 */}
      <OnboardingModal
        isOpen={activeModal === "onboarding"}
        onClose={() => setActiveModal("select")}
      />

      {/* 2. 식물 선택 */}
      <PlantSelectModal
        isOpen={activeModal === "select"}
        onClose={() => setActiveModal(null)}
        onConfirm={handleSelectConfirm}
      />

      {/* 3. 선택 확인 */}
      {selectedPlant && (
        <SelectedModal
          isOpen={activeModal === "selected"}
          plant={selectedPlant.text}
          image={selectedPlant.img}
          description={selectedPlant.description}
          onConfirm={handleFinalStart}
          onClose={() => setActiveModal("select")}
        />
      )}
      {/* 4. 시들고 있어요 */}
      <WiltingModal
        isOpen={activeModal === "wilting"}
        plant={selectedPlant?.text ?? ""}
        onClose={handleWiltingClose}
      />
      {/* 5. 시들었어요 */}
      <WiltedModal
        isOpen={activeModal === "wilted"}
        plant={selectedPlant?.text ?? ""}
        onClose={() => setActiveModal(null)}
      />

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
