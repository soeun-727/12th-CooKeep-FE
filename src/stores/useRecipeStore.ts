import { create } from "zustand";
import {
  getAiRecipeSessions,
  AiRecipeSessionItem,
  toggleFavoriteSession,
} from "../api/aiSession";

interface RecipeState {
  pinned: AiRecipeSessionItem[];
  sessions: AiRecipeSessionItem[];
  isLoading: boolean;
  error: string | null;

  fetchSessions: () => Promise<void>;
  toggleLike: (sessionId: number) => Promise<void>;
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

  toggleLike: async (sessionId: number) => {
    try {
      await toggleFavoriteSession(sessionId);

      // 서버에서 다시 데이터를 가져오거나 로컬에서 위치를 옮겨줍니다.
      // 여기서는 가장 정확한 방법인 재조회(fetch) 방식을 권장합니다.
      const data = await getAiRecipeSessions();
      set({
        pinned: data.pinned,
        sessions: data.sessions,
      });
    } catch (error) {
      console.error("즐겨찾기 변경 실패:", error);
      alert("즐겨찾기 상태를 변경하지 못했습니다.");
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
