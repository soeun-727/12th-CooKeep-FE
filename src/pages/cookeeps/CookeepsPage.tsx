// CookeepsPage.tsx
import { useEffect, useState } from "react";
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
import { preloadPlantImages } from "../../components/cookeeps/plant/preloadPlantImages";
import { useCookeepsStore } from "../../stores/useCookeepsStore";
import { PLANT_ID_TO_TYPE } from "../../constants/plantTypeMap";
import FreeWaterModal from "../../components/cookeeps/modals/FreeWaterModal";

type ActiveModal =
  | "onboarding"
  | "select"
  | "selected"
  | "wilting"
  | "wilted"
  | "free"
  | null;

export default function CookeepsPage() {
  const [toastVisible, setToastVisible] = useState(false);
  const [activeModal, setActiveModal] = useState<ActiveModal>("onboarding");
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(() => {
    return localStorage.getItem("hasSeenOnboarding") === "true";
  }); // 온보딩 모달 뜨게 하기 처음 접속 시 한번만 보이도록

  // 모달용 임시 선택 (확정 아님)
  const [selectedPlantData, setSelectedPlantData] = useState<
    (typeof PLANT_DATA)[0] | null
  >(null);
  const selectPlantInStore = useCookeepsStore((s) => s.selectPlant);

  const {
    selectedPlant: storePlant,
    status,
    checkStatusByTime,
    abandonPlant,
    recoverPlant,
  } = useCookeepsStore();

  // 모달 순서 자동 계산
  const derivedModal: ActiveModal = (() => {
    if (!hasSeenOnboarding) return "onboarding"; // 먼저 온보딩
    if (!storePlant) return "select"; // 식물 선택
    if (status === "wilting") return "wilting"; // 시들음
    if (status === "wilted") return "wilted"; // 완전히 시듦
    return activeModal;
  })();

  // 시간계산
  useEffect(() => {
    checkStatusByTime(); // 최초 1번

    const interval = setInterval(() => {
      checkStatusByTime();
    }, 60 * 1000); // 1분마다 체크

    return () => clearInterval(interval);
  }, [checkStatusByTime]);

  /* =========================
     물 주기 성공
  ========================= */
  const handleWaterSuccess = () => {
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 5000);
  };

  /* =========================
     식물 선택 → 확인 모달
  ========================= */
  const handleSelectConfirm = (id: number) => {
    const plant = PLANT_DATA.find((p) => p.id === id);
    if (!plant) return;

    setSelectedPlantData(plant);
    setActiveModal("selected");
  };

  /* =========================
     최종 시작 (store 확정)
  ========================= */
  const handleFinalStart = () => {
    if (!selectedPlantData) return;

    selectPlantInStore(PLANT_ID_TO_TYPE[selectedPlantData.id]);
    setActiveModal("free");
  };

  /* =========================
     이미지 프리로드
  ========================= */
  useEffect(() => {
    if ("requestIdleCallback" in window) {
      requestIdleCallback(() => preloadPlantImages());
    } else {
      preloadPlantImages();
    }
  }, []);

  return (
    <div className="h-[100dvh] flex flex-col overflow-hidden relative">
      {/* 1. 온보딩 */}
      <OnboardingModal
        isOpen={activeModal === "onboarding" && !hasSeenOnboarding}
        onClose={() => {
          localStorage.setItem("hasSeenOnboarding", "true"); // localStorage 저장
          setHasSeenOnboarding(true); // 상태 변경
          setActiveModal("select"); // 다음 모달로 이동
        }}
      />

      {/* 2. 식물 선택 */}
      <PlantSelectModal
        isOpen={derivedModal === "select"}
        onClose={() => setActiveModal(null)}
        onConfirm={handleSelectConfirm}
      />

      {/* 3. 선택 확인 */}
      {selectedPlantData && (
        <SelectedModal
          isOpen={activeModal === "selected"}
          plant={selectedPlantData.text}
          image={selectedPlantData.img}
          description={selectedPlantData.description}
          onConfirm={handleFinalStart}
          onClose={() => setActiveModal("select")}
        />
      )}
      {/* 무료 물주기 모달 */}
      <FreeWaterModal
        isOpen={activeModal === "free"}
        onClose={() => setActiveModal(null)}
      />

      {/* 4. 시들고 있어요 */}
      <WiltingModal
        isOpen={status === "wilting"}
        plant={selectedPlantData?.text ?? ""}
        onClose={() => setActiveModal(null)}
      />

      {/* 5. 시들었어요 */}
      <WiltedModal
        isOpen={status === "wilted"}
        plant={selectedPlantData?.text ?? ""}
        onClose={() => setActiveModal(null)}
        onAbandon={() => {
          abandonPlant();
          setActiveModal("select");
        }}
        onRecover={() => {
          recoverPlant();
          setActiveModal(null);
        }}
      />

      {/* 테스트용 버튼 */}
      {/* <div className="absolute top-0 right-0 p-2 space-x-2 z-50">
        <button
          className="bg-yellow-400 px-2 py-1 rounded text-sm"
          onClick={() => useCookeepsStore.getState().setLastWateredAtDaysAgo(7)}
        >
          Wilting 테스트 (7일 전)
        </button>

        <button
          className="bg-red-400 px-2 py-1 rounded text-sm"
          onClick={() =>
            useCookeepsStore.getState().setLastWateredAtDaysAgo(14)
          }
        >
          Wilted 테스트 (14일 전)
        </button>
      </div> */}

      {/* ===== 상단 영역 ===== */}
      <div className="relative shrink-0">
        <PlantBackground
          showToast={toastVisible}
          message="물 주기에 성공했어요!"
          overridePlantStage={activeModal === "wilted" ? 1 : undefined}
        />

        <CookeepsHeader />
      </div>

      <div className="px-4 pt-4 shrink-0">
        <PlantGrowthCard
          onWaterSuccess={handleWaterSuccess}
          overridePlantStage={activeModal === "wilted" ? 1 : undefined}
        />
      </div>

      {/* ===== 스크롤 영역 ===== */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-4 space-y-6 pt-5 pb-6">
        <WeeklyTop3Section users={top3Users} />
        <WeeklyRecipeSection topRecipes={topRecipes} />
      </div>
    </div>
  );
}
