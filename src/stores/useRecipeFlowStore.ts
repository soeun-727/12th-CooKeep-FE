// src/stores/useRecipeFlowStore.ts
import { create } from "zustand";
import type { Ingredient } from "./useIngredientStore";
import type { AiRecipeResponse, Difficulty } from "../types/aiRecipe";
import { generateAiRecipe } from "../api/aiRecipe";

type RecipeFlowState = {
  selectedIngredients: Ingredient[];
  difficulty: Difficulty | null;

  sessionId: number | null;
  retryCount: number;

  recipeHistory: AiRecipeResponse[];

  isLoading: boolean;
  error: string | null;

  setSelectedIngredients: (items: Ingredient[]) => void;
  setDifficulty: (d: Difficulty) => void;
  generateRecipe: () => Promise<void>;
  reset: () => void;

  // 작동안해서 넣어놓음
  // clearSelection: () => void;
};

export const useRecipeFlowStore = create<RecipeFlowState>((set, get) => ({
  selectedIngredients: [],
  difficulty: null,

  sessionId: null,
  retryCount: 0,

  recipeHistory: [],

  isLoading: false,
  error: null,

  setSelectedIngredients: (items) => set({ selectedIngredients: items }),

  setDifficulty: (difficulty) => set({ difficulty }),

  generateRecipe: async () => {
    const { selectedIngredients, difficulty, sessionId, recipeHistory } = get();

    if (!difficulty) return;

    try {
      const body =
        sessionId === null
          ? {
              ingredientIds: selectedIngredients.map((i) => i.id),
              difficulty,
            }
          : {
              sessionId,
            };

      const response = await generateAiRecipe(body);

      set({
        sessionId: response.sessionId,
        retryCount: response.changeCount,
        recipeHistory: [...recipeHistory, response],
      });
    } catch (error) {
      console.error("AI 레시피 생성 실패:", error);
      throw error;
    }
  },

  reset: () =>
    set({
      selectedIngredients: [],
      difficulty: null,
      sessionId: null,
      retryCount: 0,
      recipeHistory: [],
      error: null,
    }),
  // clearSelection: () =>
  //   set({
  //     selectedIngredients: [],
  //   }),
}));
