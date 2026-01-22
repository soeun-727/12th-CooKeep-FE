// src/stores/useIngredientSelectStore.ts
import { create } from "zustand";
import type { Ingredient } from "./useIngredientStore";

interface IngredientSelectState {
  /** 현재 선택된 재료 id들 */
  selectedIds: number[];

  /** 단일 재료 토글 */
  toggleSelect: (id: number) => void;

  /** 여러 재료 한 번에 세팅 */
  setFromIngredients: (ingredients: Ingredient[]) => void;

  /** 선택 초기화 */
  reset: () => void;
}

export const useIngredientSelectStore = create<IngredientSelectState>(
  (set) => ({
    selectedIds: [],

    toggleSelect: (id) =>
      set((state) => ({
        selectedIds: state.selectedIds.includes(id)
          ? state.selectedIds.filter((sid) => sid !== id)
          : [...state.selectedIds, id],
      })),

    setFromIngredients: (ingredients) =>
      set({
        selectedIds: ingredients.map((i) => i.id),
      }),

    reset: () => set({ selectedIds: [] }),
  }),
);
