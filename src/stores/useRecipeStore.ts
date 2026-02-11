import { create } from "zustand";
import { getAiRecipeSessions, AiRecipeSessionItem } from "../api/aiSession";

interface RecipeState {
  pinned: AiRecipeSessionItem[];
  sessions: AiRecipeSessionItem[];
  isLoading: boolean;
  error: string | null;

  fetchSessions: () => Promise<void>;

  // toggleLike: (id: number) => void;
  // renameRecipe: (id: number, newName: string) => void;
  // deleteRecipe: (id: number) => void;
  // setRecipes: (recipes: RecipeItem[]) => void;
}

export const useRecipeStore = create<RecipeState>((set) => ({
  pinned: [],
  sessions: [],
  isLoading: false,
  error: null,

  fetchSessions: async () => {
    try {
      set({ isLoading: true, error: null });

      const data = await getAiRecipeSessions();

      set({
        pinned: data.pinned,
        sessions: data.sessions,
        isLoading: false,
      });
    } catch (error) {
      console.error("세션 목록 조회 실패:", error);
      set({
        error: "세션 목록을 불러오지 못했습니다.",
        isLoading: false,
      });
    }
  },

  // setRecipes: (newRecipes) => set({ recipes: newRecipes }),

  // toggleLike: (id) =>
  //   set((state) => ({
  //     recipes: state.recipes.map((r) =>
  //       r.id === id ? { ...r, isLiked: !r.isLiked } : r,
  //     ),
  //   })),

  // renameRecipe: (id, newName) =>
  //   set((state) => ({
  //     recipes: state.recipes.map((r) =>
  //       r.id === id ? { ...r, name: newName } : r,
  //     ),
  //   })),

  // deleteRecipe: (id) =>
  //   set((state) => ({
  //     recipes: state.recipes.filter((r) => r.id !== id),
  //   })),
}));
