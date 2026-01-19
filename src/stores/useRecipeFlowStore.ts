import { create } from "zustand";
import type { Ingredient } from "../stores/useIngredientStore";
import type { Recipe } from "../types/recipe";
import { generateRecipe } from "../utils/generateRecipe";

export type Difficulty = "easy" | "normal" | "hard";

type RecipeFlowState = {
  selectedIngredients: Ingredient[];
  difficulty: Difficulty | null;
  retryCount: number;
  recipeHistory: Recipe[];

  setSelectedIngredients: (items: Ingredient[]) => void;
  setDifficulty: (d: Difficulty) => void;
  generateRecipe: () => void;
  increaseRetry: () => void;
  reset: () => void;
};

export const useRecipeFlowStore = create<RecipeFlowState>((set, get) => ({
  selectedIngredients: [],
  difficulty: null,
  retryCount: 0,
  recipeHistory: [],

  setSelectedIngredients: (items) => set({ selectedIngredients: items }),

  setDifficulty: (difficulty) => set({ difficulty }),

  generateRecipe: () => {
    const { selectedIngredients, difficulty, retryCount, recipeHistory } =
      get();

    if (!difficulty) return;

    const recipe = generateRecipe(selectedIngredients, retryCount);

    // 핵심: 히스토리에 추가
    set({
      recipeHistory: [...recipeHistory, recipe],
    });
  },

  increaseRetry: () => set((state) => ({ retryCount: state.retryCount + 1 })),

  reset: () =>
    set({
      selectedIngredients: [],
      difficulty: null,
      retryCount: 0,
      recipeHistory: [],
    }),
}));
