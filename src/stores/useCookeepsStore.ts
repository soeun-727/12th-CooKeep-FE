// src/stores/useCookeepsStore.ts
import { create } from "zustand";

export type PlantType =
  | "apple"
  | "beans"
  | "lettuce"
  | "tomato"
  | "potato"
  | "strawberry";

interface CookeepsState {
  selectedPlant: PlantType | null;
  plantStage: 1 | 2 | 3 | 4;

  selectPlant: (plant: PlantType) => void;
  growPlant: () => void;
  resetPlant: () => void;
}

export const useCookeepsStore = create<CookeepsState>((set, get) => ({
  selectedPlant: null,
  plantStage: 1,

  selectPlant: (plant) =>
    set({
      selectedPlant: plant,
      plantStage: 1,
    }),

  growPlant: () => {
    const { plantStage } = get();
    if (plantStage < 4) {
      set({ plantStage: (plantStage + 1) as 1 | 2 | 3 | 4 });
    }
  },

  resetPlant: () =>
    set({
      selectedPlant: null,
      plantStage: 1,
    }),
}));
