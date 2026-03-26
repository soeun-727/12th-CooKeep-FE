// CookeepsPage.tsx
import { useEffect, useState } from "react";
import PlantBackground from "../../components/cookeeps/plant/PlantBackground";
import CookeepsHeader from "../../components/cookeeps/header/CookeepsHeader";
import PlantGrowthCard from "../../components/cookeeps/plant/PlantGrowthCard";
import WeeklyTop3Section from "../../components/cookeeps/ranking/WeeklyTop3Section";
import WeeklyRecipeSection from "../../components/cookeeps/recipe/WeeklyRecipeSection";
import OnboardingModal from "../../components/cookeeps/modals/OnboardingModal";
import PlantSelectModal from "../../components/cookeeps/modals/PlantSelectModal";
import { PLANT_DATA } from "../../constants/plantData";
import SelectedModal from "../../components/cookeeps/modals/SelectedModal";
import WiltingModal from "../../components/cookeeps/modals/WiltingModal";
import WiltedModal from "../../components/cookeeps/modals/WiltedModal";
import { useCookeepsStore } from "../../stores/useCookeepsStore";
import FreeWaterModal from "../../components/cookeeps/modals/FreeWaterModal";
import HarvestModal from "../../components/cookeeps/modals/HarvestModal";
import { getWeeklyRanking, RankingResponse } from "../../api/cookeeps";
import { useLoadingStore } from "../../stores/useLoadingStore";
// import { startLoading, stopLoading } from "../../utils/loading";
import { preloadImage } from "../../utils/preloadImage";

type ActiveModal =
  | "onboarding"
  | "select"
  | "selected"
  | "wilting"
  | "wilted"
  | "free"
  | "harvest"
  | null;

interface SelectedPlant {
  id: number;
  text: string;
  img: string;
  description: string;
  isHarvested?: boolean; // optional로 두면 TS 오류 없음
}

export default function CookeepsPage() {
  const [toastVisible, setToastVisible] = useState(false);
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(() => {
    return localStorage.getItem("hasSeenOnboarding") === "true";
  }); // 온보딩 모달 뜨게 하기 처음 접속 시 한번만 보이도록

  const status = useCookeepsStore((s) => s.status);
  const abandonPlant = useCookeepsStore((s) => s.abandonPlant);
  const recoverPlant = useCookeepsStore((s) => s.recoverPlant);

  const [hideWiltingModal, setHideWiltingModal] = useState(false); // 시드는중

  // const freeWaterPlant = useCookeepsStore((s) => s.freeWaterPlant);
  const setFreeWaterMode = useCookeepsStore((s) => s.setFreeWaterMode);
  const isFreeWaterMode = useCookeepsStore((s) => s.isFreeWaterMode);
  const isPlantLoading = useCookeepsStore((s) => s.isPlantLoading);

  /* =========================
    수확 감지
  ========================= */

  const currentPlant = useCookeepsStore((s) => s.currentPlant);
  const hasShownHarvestModal = useCookeepsStore((s) => s.hasShownHarvestModal);
  const harvestedPlantNames = useCookeepsStore((s) => s.harvestedPlantNames);

  const [showHarvestModal, setShowHarvestModal] = useState(false);

  const justHarvestedPlant = useCookeepsStore((s) => s.justHarvestedPlant);

  useEffect(() => {
    if (justHarvestedPlant && !hasShownHarvestModal) {
      setShowHarvestModal(true);
    }
  }, [justHarvestedPlant, hasShownHarvestModal]);
  // 수확 모달 닫을 때 로직 수정
  const handleHarvestModalClose = async () => {
    const store = useCookeepsStore.getState();

    store.setHasShownHarvestModal(true);
    store.setJustHarvestedPlant(null);

    store.resetCurrentPlant();
    await store.fetchMyPlants();
    setShowHarvestModal(false);
    setActiveModal("select");
  };

  // 모달 순서 자동 계산
  const derivedModal: ActiveModal = (() => {
    // 수확 모달은 별도 관리
    if (showHarvestModal) return null;
    if (!hasSeenOnboarding && !currentPlant && !isPlantLoading)
      return "onboarding";
    // 3. 강제 지정된 모달(무료 물주기, 선택확인)을 우선적으로 체크
    if (activeModal === "free") return "free";
    if (activeModal === "selected") return "selected";

    // 4. 그 다음 식물이 없을 때 'select'
    if (isPlantLoading) return null;

    if (!currentPlant) return "select";

    // 식물 상태에 따른 모달
    if (status === "wilting") return "wilting";
    if (status === "wilted") return "wilted";

    return null;
  })();

  // // 시간계산
  // useEffect(() => {
  //   const { fetchGrowingPlant, fetchCookies, fetchMyPlants } =
  //     useCookeepsStore.getState();

  //   fetchGrowingPlant();
  //   fetchCookies();
  //   fetchMyPlants();
  // }, []);

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

    console.log("사용자가 선택한 식물:", plant.text, "id:", id);

    setHideWiltingModal(false); // 새 식물 → 알림 리셋
    setSelectedPlantData(plant);
    setActiveModal("selected");
  };

  /* =========================
     최종 시작 (store 확정)
  ========================= */
  const registerPlant = useCookeepsStore((s) => s.registerPlant);

  const [selectedPlantData, setSelectedPlantData] =
    useState<SelectedPlant | null>(null);

  const handleFinalStart = async () => {
    if (!selectedPlantData) return;

    try {
      const res = await registerPlant(selectedPlantData.id);
      console.log("전체 응답 확인:", res);

      const store = useCookeepsStore.getState();
      const current = store.currentPlant;

      if (!current) {
        setActiveModal("select");
        return;
      }

      // 1. UI 데이터 업데이트 로직 (기존 유지)
      const plantData = PLANT_DATA.find((p) => p.text === current.plantName);
      setSelectedPlantData({
        id: current.userPlantId,
        text: current.plantName,
        img: plantData?.img || "",
        description: plantData?.description || "",
        isHarvested: current.isHarvested,
      });

      // 2. 조건문 수정 (가장 중요)
      const responseMsg = res.data.message;

      if (responseMsg === "첫 식물 등록이 완료되었습니다.") {
        console.log("✅ 첫 등록 보너스 감지!");
        setActiveModal("free");
      } else {
        console.log("ℹ️ 일반 등록 완료 (메시지 불일치):", responseMsg);
        setActiveModal(null);
      }
    } catch (error) {
      console.error("식물 시작 실패:", error);
      setActiveModal("select");
    }
  };

  const [ranking, setRanking] = useState<RankingResponse>({
    wateringRanking: [],
    recipeRanking: [],
  });
  const setLoading = useLoadingStore((s) => s.setLoading);

  useEffect(() => {
    const { fetchGrowingPlant, fetchCookies, fetchMyPlants } =
      useCookeepsStore.getState();

    const fetchAllData = async () => {
      console.log("🔥 start");
      setLoading(true);

      try {
        const [, , , rankingData] = await Promise.all([
          fetchGrowingPlant(),
          fetchCookies(),
          fetchMyPlants(),
          getWeeklyRanking(),
        ]);

        setRanking(rankingData);

        // 여기 핵심 추가
        const store = useCookeepsStore.getState();
        const plantName = store.currentPlant?.plantName;

        if (plantName) {
          const plantData = PLANT_DATA.find((p) => p.text === plantName);

          if (plantData?.img) {
            await preloadImage(plantData.img); // 이미지 로딩 기다림
          }
        }
      } catch (e) {
        console.error("❌ 에러:", e);
      } finally {
        console.log("🔥 end (로딩 끝)");
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  useEffect(() => {
    if (currentPlant && !hasSeenOnboarding) {
      localStorage.setItem("hasSeenOnboarding", "true");
      setHasSeenOnboarding(true);
    }
  }, [currentPlant, hasSeenOnboarding]);

  return (
    <div className="flex-1 flex flex-col min-h-0 relative no-scrollbar">
      {/* 1. 온보딩 */}
      <OnboardingModal
        isOpen={derivedModal === "onboarding"}
        onClose={() => {
          localStorage.setItem("hasSeenOnboarding", "true"); // localStorage 저장
          setHasSeenOnboarding(true); // 상태 변경
          setActiveModal("select"); // 다음 모달로 이동
        }}
      />

      {/* 2. 식물 선택 */}
      <PlantSelectModal
        // key={derivedModal === "select" ? "open" : "closed"}
        isOpen={derivedModal === "select"}
        onConfirm={handleSelectConfirm}
        harvestedPlantNames={harvestedPlantNames}
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
        isOpen={derivedModal === "free"}
        onConfirm={() => {
          setFreeWaterMode(true); // 무료 물주기 모드 ON
          setActiveModal(null);
        }}
        onClose={() => {
          setActiveModal(null);
        }}
      />

      {/* 4. 시들고 있어요 */}
      <WiltingModal
        isOpen={status === "wilting" && !hideWiltingModal}
        plant={selectedPlantData?.text ?? ""}
        onClose={() => setHideWiltingModal(true)}
      />

      {/* 5. 시들었어요 */}
      <WiltedModal
        isOpen={status === "wilted"}
        plant={selectedPlantData?.text ?? ""}
        onClose={() => setActiveModal(null)}
        onAbandon={async () => {
          try {
            await abandonPlant();
            setHideWiltingModal(false);
            setActiveModal("select");
          } catch {
            alert("식물 포기에 실패했습니다. 다시 시도해 주세요.");
          }
        }}
        onRecover={async () => {
          try {
            await recoverPlant();
            setHideWiltingModal(false);
            setActiveModal(null);
          } catch {
            alert("식물 회복에 실패했습니다. 다시 시도해 주세요.");
          }
        }}
      />

      {/* 수확 모달 */}
      <HarvestModal
        isOpen={showHarvestModal}
        onClose={handleHarvestModalClose}
      />

      {/* ===== 상단 영역 ===== */}
      <div className="relative shrink-0 -mt-[35px]">
        <PlantBackground
          showToast={toastVisible}
          message="물 주기에 성공했어요!"
          plant={currentPlant?.plantName}
          isLoading={isPlantLoading}
          overridePlantStage={
            showHarvestModal
              ? 4 // 수확 모달 떠있을 때 4단계 유지
              : activeModal === "wilted"
                ? 1
                : undefined
          }
        />

        <CookeepsHeader />
      </div>

      <div className="px-4 shrink-0">
        <PlantGrowthCard
          plant={currentPlant?.plantName}
          onWaterSuccess={handleWaterSuccess}
          overridePlantStage={
            showHarvestModal
              ? 4 // 수확 모달 떠있을 때 4단계 유지
              : activeModal === "wilted"
                ? 1
                : undefined
          }
        />
      </div>
      {isFreeWaterMode && (
        <div className="absolute inset-0 z-60 pointer-events-none">
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}
      {/* ===== 스크롤 영역 ===== */}

      <div className="flex-1 overflow-y-auto no-scrollbar px-4 space-y-6 pt-5 pb-12">
        <WeeklyTop3Section users={ranking?.wateringRanking ?? []} />
        <WeeklyRecipeSection topRecipes={ranking?.recipeRanking ?? []} />
      </div>
    </div>
  );
}
