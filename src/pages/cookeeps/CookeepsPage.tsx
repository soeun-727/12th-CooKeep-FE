// CookeepsPage.tsx
import { useEffect, useRef, useState } from "react";
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
// import { PLANT_ID_TO_TYPE } from "../../constants/plantTypeMap";
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

  // 모달용 임시 선택 (확정 아님)
  // const [selectedPlantData, setSelectedPlantData] = useState<
  //   (typeof PLANT_DATA)[0] | null
  // >(null);
  // const selectPlantInStore = useCookeepsStore((s) => s.selectPlant);

  // const storePlant = useCookeepsStore((s) => s.selectedPlant);
  const status = useCookeepsStore((s) => s.status);
  const abandonPlant = useCookeepsStore((s) => s.abandonPlant);
  const recoverPlant = useCookeepsStore((s) => s.recoverPlant);

  const [hideWiltingModal, setHideWiltingModal] = useState(false); // 시드는중

  const [hasUsedFreeWater, setHasUsedFreeWater] = useState(() => {
    return localStorage.getItem("hasUsedFreeWater") === "true";
  }); // 처음만 무료 물주기

  const freeWaterPlant = useCookeepsStore((s) => s.freeWaterPlant);

  /* =========================
    수확 감지
  ========================= */

  const currentPlant = useCookeepsStore((s) => s.currentPlant);
  const hasShownHarvestModal = useCookeepsStore((s) => s.hasShownHarvestModal);
  const harvestedPlantNames = useCookeepsStore((s) => s.harvestedPlantNames);

  const [showHarvestModal, setShowHarvestModal] = useState(false);

  const harvestTriggeredRef = useRef(false);

  const justHarvestedPlant = useCookeepsStore((s) => s.justHarvestedPlant);
  // const setJustHarvestedPlant = useCookeepsStore((s) => s.setJustHarvestedPlant);

  // 🔥 수확 감지 로직 수정
  useEffect(() => {
    if (harvestTriggeredRef.current) return;

    // justHarvestedPlant가 설정되면 즉시 모달 표시
    if (justHarvestedPlant && !hasShownHarvestModal) {
      harvestTriggeredRef.current = true;
      setShowHarvestModal(true);
    }
  }, [justHarvestedPlant, hasShownHarvestModal]);

  // 🔥 수확 모달 닫을 때 로직 수정
  const handleHarvestModalClose = async () => {
    const store = useCookeepsStore.getState();

    store.setHasShownHarvestModal(true);
    store.setPrevCookie(null);
    store.setJustHarvestedPlant(null); // 🔥 추가
    store.resetCurrentPlant();

    harvestTriggeredRef.current = false;
    setSelectedPlantData(null);
    setShowHarvestModal(false);

    // 🔥 선택 모달로 전환
    setActiveModal("select");
  };

  // 획득 쿠키 계산 수정
  const earnedCookie = (() => {
    const store = useCookeepsStore.getState();
    const { cookie, prevCookie } = store;
    if (prevCookie !== null && cookie > prevCookie) {
      return cookie - prevCookie;
    }
    return 0;
  })();

  // 모달 순서 자동 계산
  const derivedModal: ActiveModal = (() => {
    if (!hasSeenOnboarding) return "onboarding";

    // 🔥 수확 모달 최우선
    if (showHarvestModal) return null; // 수확 모달은 별도 관리

    if (!currentPlant) return "select";
    if (status === "wilting") return "wilting";
    if (status === "wilted") return "wilted";
    if (!hasUsedFreeWater) return "free";
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

    console.log("🎯 사용자가 선택한 식물:", plant.text, "id:", id);

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

  // CookeepsPage.tsx의 handleFinalStart 수정

  const handleFinalStart = async () => {
    if (!selectedPlantData) return;

    try {
      console.log("🌱 등록 시작:", selectedPlantData);

      // 1. 선택한 식물 등록 (내부에서 fetchMyPlants 호출됨)
      await registerPlant(selectedPlantData.id);

      // 🔥 여기서 fetchMyPlants 중복 호출 제거!
      // await useCookeepsStore.getState().fetchMyPlants(); // ← 삭제

      // 2. store에서 업데이트된 currentPlant 가져오기
      const store = useCookeepsStore.getState();
      const current = store.currentPlant;

      console.log("✅ 등록 완료:", current);

      if (!current) {
        console.error("❌ 식물 등록 후 currentPlant가 없습니다");
        setActiveModal("select");
        return;
      }

      // 3. UI용 selectedPlantData 업데이트
      const plantData = PLANT_DATA.find((p) => p.text === current.plantName);

      setSelectedPlantData({
        id: current.userPlantId,
        text: current.plantName,
        img: plantData?.img || "",
        description: plantData?.description || "",
        isHarvested: current.isHarvested,
      });

      // 4. 다음 단계로
      setActiveModal(!hasUsedFreeWater ? "free" : null);
    } catch (error) {
      console.error("❌ 식물 시작 실패:", error);
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
        isOpen={activeModal === "free"}
        onConfirm={async () => {
          await freeWaterPlant(); // 이게 핵심
          localStorage.setItem("hasUsedFreeWater", "true");
          setHasUsedFreeWater(true);
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
        cookieAmount={earnedCookie}
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
              ? 4 // 🔥 수확 모달 떠있을 때 4단계 유지
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
              ? 4 // 🔥 수확 모달 떠있을 때 4단계 유지
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
