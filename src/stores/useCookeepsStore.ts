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

  grownPlants: PlantType[]; // 다 키운 식물 목록

  lastRefreshedAt: Date | null;

  refreshGrowth: () => void;

  cookie: number;

  selectPlant: (plant: PlantType) => void;
  growPlant: () => void;
  waterPlant: () => void;
}

export const useCookeepsStore = create<CookeepsState>((set, get) => ({
  selectedPlant: null,
  plantStage: 1,

  grownPlants: [],

  cookie: 100,

  lastRefreshedAt: null,

  refreshGrowth: () =>
    set({
      lastRefreshedAt: new Date(),
    }),

  selectPlant: (plant) =>
    set({
      selectedPlant: plant,
      plantStage: 1,
    }),

  growPlant: () => {
    const { plantStage, selectedPlant, grownPlants } = get();
    if (!selectedPlant || plantStage >= 4) return;

    const nextStage = (plantStage + 1) as PlantStage;

    if (nextStage === 4) {
      set({
        plantStage: 4,
        // selectedPlant: null,
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

    set({ cookie: cookie - 10 });
    growPlant();
  },
}));
