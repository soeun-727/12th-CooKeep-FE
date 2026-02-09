// src/stores/useCookeepsStore.ts
import { create } from "zustand";
import {
  deleteMyPlant,
  getMyPlants,
  registerMyPlant,
  reviveMyPlant,
  setProfileMyPlant,
  waterMyPlant,
} from "../api/myPlants";
import type { MyPlant } from "../types/myPlant";
import {
  PLANT_ID_TO_NAME,
  PLANT_NAME_TO_TYPE,
} from "../constants/plantTypeMap";
import { getMyCookies } from "../api/cookies";
import type { ApiResponse } from "../api/types";

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
  harvestedPlantNames: string[];

  // 현재 키우는 식물 (서버 기준)
  currentPlant: MyPlant | null;
  // API 연동용
  // 추가
  justHarvestedPlant: MyPlant | null;
  setJustHarvestedPlant: (plant: MyPlant | null) => void;
  fetchMyPlants: () => Promise<void>;
  registerPlant: (plantId: number) => Promise<ApiResponse<string>>;

  selectedPlant: PlantType | null;
  plantStage: PlantStage;
  // grownPlants: PlantType[]; // 다 키운 식물 목록
  lastRefreshedAt: Date | null;
  refreshGrowth: () => void;

  cookie: number;
  fetchCookies: () => Promise<void>;
  prevCookie: number | null;
  setPrevCookie: (value: number | null) => void;

  status: PlantStatus;
  lastWateredAt: Date | null;

  selectPlant: (plant: PlantType) => void;
  // growPlant: () => void;
  waterPlant: () => void;
  abandonPlant: () => Promise<void>;
  recoverPlant: () => void;

  hasShownWilting: boolean;
  checkStatusByTime: () => void;

  // 물주는거 버튼 전달때문
  wantsToWater: boolean;
  setWantsToWater: (v: boolean) => void;

  freeWaterPlant: () => void; // 무료물주기

  // addCookie: () => void;

  setProfilePlant: (userPlantId: number) => Promise<void>;

  // 수확
  hasShownHarvestModal: boolean;
  setHasShownHarvestModal: (v: boolean) => void;

  resetCurrentPlant: () => void;

  // ✅ 테스트용
  // setLastWateredAtDaysAgo: (daysAgo: number) => void;
}

export const useCookeepsStore = create<CookeepsState>((set, get) => ({
  myPlants: [],
  harvestedPlantNames: [],

  currentPlant: null,
  justHarvestedPlant: null,
  setJustHarvestedPlant: (plant) => set({ justHarvestedPlant: plant }),

  fetchMyPlants: async () => {
    try {
      const plants: MyPlant[] = await getMyPlants();
      const prevPlant = get().currentPlant;

      console.log("fetchMyPlants 호출");
      console.log(
        "  - 이전 currentPlant:",
        prevPlant?.plantName,
        prevPlant?.level,
      );
      console.log(
        "  - justHarvestedPlant:",
        get().justHarvestedPlant?.plantName,
      );

      // 수확 감지
      if (prevPlant && prevPlant.level === 3) {
        const harvestedVersion = plants.find(
          (p) => p.userPlantId === prevPlant.userPlantId && p.isHarvested,
        );

        if (harvestedVersion) {
          console.log("수확 감지!", harvestedVersion.plantName);

          // 잠깐 level 4로 보여주기 위해 임시 상태 설정
          const temp4thStage: MyPlant = {
            ...harvestedVersion,
            level: 4,
            isHarvested: false, // 임시로 false
          };

          set({
            currentPlant: temp4thStage, // 4단계 이미지 보여주기
            plantStage: 4,
            selectedPlant: PLANT_NAME_TO_TYPE[temp4thStage.plantName],
          });

          // 2초 후에 수확 상태로 전환
          await new Promise((resolve) => setTimeout(resolve, 2000));

          set({ justHarvestedPlant: harvestedVersion });
        }
      }

      let current: MyPlant | null = null;

      if (get().justHarvestedPlant) {
        console.log("  → 수확 직후이므로 currentPlant = null");
        current = null;
      } else {
        current = plants.find((p) => p.isProfile && !p.isHarvested) || null;

        if (current) {
          console.log(
            "  → 프로필 식물 선택:",
            current.plantName,
            current.level,
          );
        } else if (prevPlant && !prevPlant.isHarvested) {
          const stillValid = plants.find(
            (p) => p.userPlantId === prevPlant.userPlantId && !p.isHarvested,
          );
          if (stillValid) {
            current = stillValid;
            console.log(
              "  → 이전 식물 유지:",
              current.plantName,
              current.level,
            );

            if (prevPlant.level !== stillValid.level) {
              console.log(
                `  레벨 변화 감지: ${prevPlant.level} → ${stillValid.level}`,
              );
            }
          }
        }
      }

      set({
        myPlants: plants,
        currentPlant: current,
        harvestedPlantNames: plants
          .filter((p) => p.isHarvested)
          .map((p) => p.plantName),
        plantStage: current?.level ?? 1,
        selectedPlant: current ? PLANT_NAME_TO_TYPE[current.plantName] : null,
      });

      console.log("서버 식물 목록:", plants.length, "개");
      console.log(
        "최종 currentPlant:",
        current?.plantName || "없음",
        current?.level || "-",
      );
    } catch (e) {
      console.error("식물 조회 실패", e);
    }
  },

  registerPlant: async (plantId: number) => {
    try {
      console.log("식물 등록 API 호출:", plantId);

      const response = await registerMyPlant(plantId);
      console.log("등록 API 응답:", response);

      set({ hasShownHarvestModal: false, justHarvestedPlant: null });

      const expectedPlantName = PLANT_ID_TO_NAME[plantId];
      await get().fetchMyPlants();

      const plants = get().myPlants;
      const candidates = plants.filter(
        (p) => p.plantName === expectedPlantName && !p.isHarvested,
      );

      const justRegistered = candidates.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )[0];

      if (justRegistered) {
        set({
          currentPlant: justRegistered,
          selectedPlant: PLANT_NAME_TO_TYPE[justRegistered.plantName],
          plantStage: justRegistered.level,
        });
        console.log("등록된 식물 설정 완료:", justRegistered);
      }

      // 핵심: 백엔드 응답을 그대로 리턴해서 페이지에서 메시지를 읽을 수 있게 함
      return response;
    } catch (e) {
      console.error("식물 등록 실패", e);
      throw e;
    }
  },

  selectedPlant: null,
  plantStage: 1,
  // grownPlants: [],
  cookie: 0,

  fetchCookies: async () => {
    try {
      const cookie = await getMyCookies();
      set({ cookie });
    } catch (e) {
      console.error("쿠키 조회 실패:", e);
    }
  },

  prevCookie: null,
  setPrevCookie: (value) => set({ prevCookie: value }),

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

  selectPlant: async (plant: PlantType) => {
    const plantIdMap: Record<PlantType, number> = {
      apple: 1,
      beans: 2,
      lettuce: 3,
      tomato: 4,
      potato: 5,
      strawberry: 6,
    };

    await registerMyPlant(plantIdMap[plant]);

    // 서버 기준으로 다시 동기화
    await get().fetchMyPlants();
  },

  waterPlant: async () => {
    const { currentPlant, cookie } = get();
    if (!currentPlant) {
      console.log("물주기 실패: currentPlant 없음");
      return;
    }

    const beforeLevel = currentPlant.level;
    console.log("물주기 시작:", {
      plantName: currentPlant.plantName,
      level: beforeLevel,
      userPlantId: currentPlant.userPlantId,
      cookie,
    });

    if (beforeLevel === 3) {
      set({ prevCookie: cookie });
      console.log("  → prevCookie 저장:", cookie);
    }

    if (cookie < 10) {
      console.log("쿠키 부족");
      return;
    }

    try {
      const response = await waterMyPlant(currentPlant.userPlantId);
      console.log("물주기 API 응답:", response);

      // 최종 상태 갱신
      await get().fetchMyPlants();
      await get().fetchCookies();

      const newPlant = get().currentPlant;
      console.log("물주기 완료:", {
        이전레벨: beforeLevel,
        현재레벨: newPlant?.level,
        식물: newPlant?.plantName,
        userPlantId: newPlant?.userPlantId,
      });
    } catch (e) {
      console.error("물주기 실패:", e);
    }
  },

  freeWaterPlant: async () => {
    const { currentPlant } = get();
    if (!currentPlant) return;

    try {
      await waterMyPlant(currentPlant.userPlantId);
      await get().fetchMyPlants();
      await get().fetchCookies();
    } catch (e) {
      console.error("무료 물주기 실패", e);
    }
  },

  // 포기하기
  abandonPlant: async () => {
    const { currentPlant } = get();
    if (!currentPlant) return;

    try {
      await deleteMyPlant(currentPlant.userPlantId);
      await get().fetchMyPlants();
      set({
        selectedPlant: null,
        hasShownHarvestModal: false,
        plantStage: 1,
        status: "normal",
        lastWateredAt: null,
        hasShownWilting: false,
      });
    } catch (e) {
      console.error("포기 실패", e);
    }
  },

  recoverPlant: async () => {
    const { currentPlant } = get();
    if (!currentPlant) return;

    try {
      await reviveMyPlant(currentPlant.userPlantId);
      await get().fetchMyPlants();
      await get().fetchCookies();
      set({
        status: "normal",
        lastWateredAt: new Date(),
        hasShownWilting: false,
      });
    } catch (e) {
      console.error("회복 실패", e);
    }
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

  // addCookie: () => set((state) => ({ cookie: state.cookie + 1 })), // 쿠키 +1 함수 추가

  setProfilePlant: async (userPlantId: number) => {
    await setProfileMyPlant(userPlantId);

    // 서버 기준으로 다시 동기화
    await get().fetchMyPlants();
  },

  // 수확
  hasShownHarvestModal: false,
  setHasShownHarvestModal: (v) => set({ hasShownHarvestModal: v }),

  resetCurrentPlant: () => {
    set({
      currentPlant: null,
      selectedPlant: null,
      plantStage: 1,
      status: "normal",
      lastWateredAt: null,
    });
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
