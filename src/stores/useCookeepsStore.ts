// src/stores/useCookeepsStore.ts
import { create } from "zustand";
import { getMyPlants } from "../api/myPlants";
import type { MyPlant } from "../types/myPlant";
import { PLANT_NAME_TO_TYPE } from "../constants/plantTypeMap";

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
  //  서버 식물 목록
  myPlants: MyPlant[];

  // 현재 키우는 식물 (서버 기준)
  currentPlant: MyPlant | null;
  // API 연동용
  fetchMyPlants: () => Promise<void>;

  selectedPlant: PlantType | null;
  plantStage: PlantStage;
  // grownPlants: PlantType[]; // 다 키운 식물 목록
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

  freeWaterPlant: () => void; // 무료물주기

  addCookie: () => void;

  // ✅ 테스트용
  // setLastWateredAtDaysAgo: (daysAgo: number) => void;
}

export const useCookeepsStore = create<CookeepsState>((set, get) => ({
  myPlants: [],
  currentPlant: null,

  fetchMyPlants: async () => {
    const plants: MyPlant[] = await getMyPlants();

    const current = plants.find((p: MyPlant) => !p.isHarvested && p.isProfile);

    const mappedPlant = current ? PLANT_NAME_TO_TYPE[current.plantName] : null;

    if (current && !mappedPlant) {
      console.warn("Unknown plantName from server:", current.plantName);
    }

    set({
      myPlants: plants,
      currentPlant: current,
      selectedPlant: mappedPlant ?? null,
      plantStage: current?.level ?? 1,
    });

    console.log("📦 서버 식물 목록:", plants);
    console.log("🌱 현재 식물:", current);
    console.log("🔁 매핑 결과:", mappedPlant);
  },

  selectedPlant: null,
  plantStage: 1,
  // grownPlants: [],
  cookie: 100,
  status: "normal",
  lastWateredAt: null,
  lastRefreshedAt: null,

  hasShownWilting: false,

  refreshGrowth: () => {
    const { lastRefreshedAt } = get();

    const now = new Date();

    // 1초 이내면 갱신 안 함 (연속 호출 방지)
    if (lastRefreshedAt && now.getTime() - lastRefreshedAt.getTime() < 1000) {
      return;
    }

    set({ lastRefreshedAt: now });
  },

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
    const { plantStage, selectedPlant } = get();
    if (!selectedPlant || plantStage >= 4) return;

    const nextStage = (plantStage + 1) as PlantStage;

    if (nextStage === 4) {
      set({
        plantStage: 4,
        // selectedPlant: null,
        status: "normal",
        // grownPlants: [...grownPlants, selectedPlant], // 저장
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

  // 무료 물주기
  freeWaterPlant: () => {
    const { selectedPlant, plantStage, growPlant } = get();

    if (!selectedPlant) return;
    if (plantStage >= 4) return;

    set({
      status: "normal",
      lastWateredAt: new Date(),
      hasShownWilting: false,
    });

    growPlant(); // 성장만 시킴 (쿠키 X)
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

    if (diffDays >= 14) {
      if (status !== "wilted") {
        set({ status: "wilted" });
      }
      return;
    }

    if (diffDays >= 7 && diffDays < 14) {
      if (status !== "wilting") {
        set({ status: "wilting" });
      }
      return;
    }

    // 정상 상태로 돌아갈 수도 있게
    if (diffDays < 7 && status !== "normal") {
      set({ status: "normal" });
    }
  },
  addCookie: () => set((state) => ({ cookie: state.cookie + 1 })), // 쿠키 +1 함수 추가

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
