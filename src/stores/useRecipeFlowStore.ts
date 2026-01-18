import { create } from "zustand";

export type Difficulty = "easy" | "normal" | "hard";

type RecipeFlowState = {
  selectedIngredients: number[];
  setSelectedIngredients: (ids: number[]) => void;
  difficulty: Difficulty | null;
  retryCount: number;

  toggleIngredient: (id: number) => void;
  setDifficulty: (d: Difficulty) => void;
  increaseRetry: () => void;
  reset: () => void;
};

export const useRecipeFlowStore = create<RecipeFlowState>((set) => ({
  selectedIngredients: [],
  setSelectedIngredients: (ids) => set({ selectedIngredients: ids }),
  difficulty: null,
  retryCount: 0,

  toggleIngredient: (id) =>
    set((state) => ({
      selectedIngredients: state.selectedIngredients.includes(id)
        ? state.selectedIngredients.filter((i) => i !== id)
        : [...state.selectedIngredients, id],
    })),

  setDifficulty: (difficulty) => set({ difficulty }),

  increaseRetry: () => set((state) => ({ retryCount: state.retryCount + 1 })),

  reset: () =>
    set({
      selectedIngredients: [],
      difficulty: null,
      retryCount: 0,
    }),
}));
