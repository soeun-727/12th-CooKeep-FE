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
import { useCookeepsStore } from "../../stores/useCookeepsStore";
import FreeWaterModal from "../../components/cookeeps/modals/FreeWaterModal";
import HarvestModal from "../../components/cookeeps/modals/HarvestModal";

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
  const [activeModal, setActiveModal] = useState<ActiveModal>("onboarding");
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(() => {
    return localStorage.getItem("hasSeenOnboarding") === "true";
  }); // 온보딩 모달 뜨게 하기 처음 접속 시 한번만 보이도록

  const status = useCookeepsStore((s) => s.status);
  const abandonPlant = useCookeepsStore((s) => s.abandonPlant);
  const recoverPlant = useCookeepsStore((s) => s.recoverPlant);

  const [hideWiltingModal, setHideWiltingModal] = useState(false); // 시드는중

  const freeWaterPlant = useCookeepsStore((s) => s.freeWaterPlant);

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
      // eslint-disable-next-line react-hooks/set-state-in-effect
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
    if (!hasSeenOnboarding) return "onboarding";

    // 수확 모달은 별도 관리
    if (showHarvestModal) return null;

    // 무료 물주기 모달
    if (activeModal === "free") return "free";

    // 식물이 없는 경우 선택 모달
    if (!currentPlant) return "select";

    // 식물 상태에 따른 모달
    if (status === "wilting") return "wilting";
    if (status === "wilted") return "wilted";

    return null;
  })();

  // 시간계산
  useEffect(() => {
    const { fetchMyPlants, fetchCookies, checkStatusByTime } =
      useCookeepsStore.getState();

    fetchMyPlants();
    fetchCookies(); //  필수
    checkStatusByTime();

    const interval = setInterval(() => {
      checkStatusByTime();
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

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
      // 1. 등록 실행 및 서버 응답 받기
      const res = await registerPlant(selectedPlantData.id);

      const store = useCookeepsStore.getState();
      const current = store.currentPlant;

      if (!current) {
        setActiveModal("select");
        return;
      }

      // 2. UI 데이터 업데이트
      const plantData = PLANT_DATA.find((p) => p.text === current.plantName);
      setSelectedPlantData({
        id: current.userPlantId,
        text: current.plantName,
        img: plantData?.img || "",
        description: plantData?.description || "",
        isHarvested: current.isHarvested,
      });

      // 실제 서버 응답 body의 'data' 필드에 메시지가 담겨 오므로 이를 체크합니다.
      if (res?.data === "첫 식물 등록이 완료되었습니다.") {
        console.log("첫 등록 보너스 감지!");
        setActiveModal("free");
      } else {
        console.log("일반 등록 완료");
        setActiveModal(null);
      }
    } catch (error) {
      console.error("식물 시작 실패:", error);
      setActiveModal("select");
    }
  };

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
        key={derivedModal === "select" ? "open" : "closed"}
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
        onConfirm={async () => {
          await freeWaterPlant(); // 쿠키 소모 없이 물주기 API 호출
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
        onAbandon={() => {
          abandonPlant();
          setHideWiltingModal(false); // 추가
          setActiveModal("select");
        }}
        onRecover={() => {
          recoverPlant();
          setHideWiltingModal(false); // 추가
          setActiveModal(null);
        }}
      />

      {/* 수확 모달 */}
      <HarvestModal
        isOpen={showHarvestModal}
        onClose={handleHarvestModalClose}
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
          plant={currentPlant?.plantName}
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

      <div className="px-4 pt-4 shrink-0">
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

      {/* ===== 스크롤 영역 ===== */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-4 space-y-6 pt-5 pb-6">
        <WeeklyTop3Section users={top3Users} />
        <WeeklyRecipeSection topRecipes={topRecipes} />
      </div>
    </div>
  );
}
