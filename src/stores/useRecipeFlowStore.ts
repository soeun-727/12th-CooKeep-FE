import { create } from "zustand";

import type { Ingredient } from "../stores/useIngredientStore";

export type Difficulty = "easy" | "normal" | "hard";

type RecipeFlowState = {
  selectedIngredients: Ingredient[];
  difficulty: Difficulty | null;
  retryCount: number;

  setSelectedIngredients: (items: Ingredient[]) => void;
  setDifficulty: (d: Difficulty) => void;
  increaseRetry: () => void;
  reset: () => void;
};

export const useRecipeFlowStore = create<RecipeFlowState>((set) => ({
  selectedIngredients: [],
  difficulty: null,
  retryCount: 0,

  setSelectedIngredients: (items) => set({ selectedIngredients: items }),

  setDifficulty: (difficulty) => set({ difficulty }),

  increaseRetry: () => set((state) => ({ retryCount: state.retryCount + 1 })),

  reset: () =>
    set({
      selectedIngredients: [],
      difficulty: null,
      retryCount: 0,
    }),
}));
