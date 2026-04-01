// src/stores/useWeeklyGoalStore.ts
import { create } from "zustand";

interface WeeklyGoalState {
  isModalOpen: boolean;
  showWeeklyGoalModal: () => void;
  hideWeeklyGoalModal: () => void;
}

export const useWeeklyGoalStore = create<WeeklyGoalState>((set) => ({
  isModalOpen: false,
  showWeeklyGoalModal: () => set({ isModalOpen: true }),
  hideWeeklyGoalModal: () => set({ isModalOpen: false }),
}));
