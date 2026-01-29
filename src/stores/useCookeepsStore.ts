// src/stores/useCookeepsStore.ts
import { create } from "zustand";

export type PlantType =
  | "apple"
  | "beans"
  | "lettuce"
  | "tomato"
  | "potato"
  | "strawberry";

export type PlantStatus = "normal" | "wilting" | "wilted";

export type PlantStage = 1 | 2 | 3 | 4;

interface CookeepsState {
  selectedPlant: PlantType | null;
  plantStage: PlantStage;
  grownPlants: PlantType[]; // 다 키운 식물 목록
  lastRefreshedAt: Date | null;
  refreshGrowth: () => void;
  cookie: number;

  status: PlantStatus;
  lastWateredAt: Date | null;

  selectPlant: (plant: PlantType) => void;
  growPlant: () => void;
  waterPlant: () => void;
  abandonPlant: () => void;
  recoverPlant: () => void;

  hasShownWilting: boolean;
  checkStatusByTime: () => void;

  // 물주는거 버튼 전달때문
  wantsToWater: boolean;
  setWantsToWater: (v: boolean) => void;

  // ✅ 테스트용
  // setLastWateredAtDaysAgo: (daysAgo: number) => void;
}

export const useCookeepsStore = create<CookeepsState>((set, get) => ({
  selectedPlant: null,
  plantStage: 1,
  grownPlants: [],
  cookie: 100,
  status: "normal",
  lastWateredAt: null,
  lastRefreshedAt: null,

  hasShownWilting: false,

  refreshGrowth: () =>
    set({
      lastRefreshedAt: new Date(),
    }),

  wantsToWater: false,
  setWantsToWater: (v) => set({ wantsToWater: v }),

  selectPlant: (plant) =>
    set({
      selectedPlant: plant,
      plantStage: 1,
      status: "normal",
      lastWateredAt: new Date(), // 시작 기준
      hasShownWilting: false, // 시들림 기록 초기화
    }),

  growPlant: () => {
    const { plantStage, selectedPlant, grownPlants } = get();
    if (!selectedPlant || plantStage >= 4) return;

    const nextStage = (plantStage + 1) as PlantStage;

    if (nextStage === 4) {
      set({
        plantStage: 4,
        // selectedPlant: null,
        status: "normal",
        grownPlants: [...grownPlants, selectedPlant], // 저장
      });
    } else {
      set({ plantStage: nextStage });
    }
  },

  waterPlant: () => {
    const { cookie, selectedPlant, plantStage, growPlant } = get();

    if (!selectedPlant) return;
    if (cookie < 10) return;
    if (plantStage >= 4) return;

    set({
      cookie: cookie - 10,
      status: "normal",
      lastWateredAt: new Date(),
      hasShownWilting: false, // 다시 시들 수 있음
    });

    growPlant();
  },

  // 포기하기
  abandonPlant: () =>
    set({
      selectedPlant: null,
      plantStage: 1,
      status: "normal",
      lastWateredAt: null,
      hasShownWilting: false,
    }),

  // 회복하기
  recoverPlant: () => {
    const { cookie } = get();
    if (cookie < 5) return;

    set({
      cookie: cookie - 5,
      status: "normal",
      lastWateredAt: new Date(),
      hasShownWilting: false,
    });
  },

  checkStatusByTime: () => {
    const { lastWateredAt, status } = get();
    if (!lastWateredAt) return;

    const diffDays =
      (Date.now() - new Date(lastWateredAt).getTime()) / (1000 * 60 * 60 * 24);

    // 완전 시듦
    if (diffDays >= 14 && status !== "wilted") {
      set({ status: "wilted" });
      return;
    }

    // 시들어가는 중 (7~13일) → 매번 Wilting
    if (diffDays >= 7 && diffDays < 14) {
      set({ status: "wilting" });
    }
  },

  /* =========================
     테스트용: lastWateredAt 조작
     daysAgo: 7 → Wilting
     daysAgo: 14 → Wilted
  ========================= */
  // setLastWateredAtDaysAgo: (daysAgo: number) => {
  //   const newDate = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);
  //   set({ lastWateredAt: newDate });
  //   // 상태 체크 바로 실행
  //   get().checkStatusByTime();
  // },
}));
