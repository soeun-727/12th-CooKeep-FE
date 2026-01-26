// src/stores/useCookeepsStore.ts
import { create } from "zustand";

export type PlantType =
  | "apple"
  | "beans"
  | "lettuce"
  | "tomato"
  | "potato"
  | "strawberry";

export type PlantStage = 1 | 2 | 3 | 4;

interface CookeepsState {
  selectedPlant: PlantType | null;
  plantStage: PlantStage;

  cookie: number;

  selectPlant: (plant: PlantType) => void;
  growPlant: () => void;
  waterPlant: () => void;
}

export const useCookeepsStore = create<CookeepsState>((set, get) => ({
  selectedPlant: null,
  plantStage: 1,

  cookie: 100, // 초기 쿠키 (임시)

  selectPlant: (plant) =>
    set({
      selectedPlant: plant,
      plantStage: 1,
    }),

  growPlant: () => {
    const { plantStage } = get();
    if (plantStage >= 4) return;

    set({
      plantStage: (plantStage + 1) as PlantStage,
    });
  },

  waterPlant: () => {
    const { cookie, selectedPlant, plantStage, growPlant } = get();

    // 조건들
    if (!selectedPlant) return;
    if (cookie < 10) return;
    if (plantStage >= 4) return;

    // 쿠키 차감
    set({ cookie: cookie - 10 });

    // 성장
    growPlant();
  },
}));
