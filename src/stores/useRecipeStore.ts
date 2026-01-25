import { create } from "zustand";

export interface RecipeItem {
  id: number;
  name: string;
  isLiked: boolean;
}

interface RecipeState {
  recipes: RecipeItem[];
  toggleLike: (id: number) => void;
  renameRecipe: (id: number, newName: string) => void;
  deleteRecipe: (id: number) => void;
  setRecipes: (recipes: RecipeItem[]) => void;
}

export const useRecipeStore = create<RecipeState>((set) => ({
  recipes: [
    { id: 1, name: "참치마요 덮밥", isLiked: true },
    { id: 2, name: "남은 야채 비빔밥", isLiked: false },
    { id: 3, name: "토마토 달걀 볶음 (토달볶)", isLiked: true },
    { id: 4, name: "스팸 김치찌개 레시피", isLiked: false },
    { id: 5, name: "베이컨 크림 파스타", isLiked: false },
    { id: 6, name: "계란 간장 버터밥", isLiked: true },
  ],

  setRecipes: (newRecipes) => set({ recipes: newRecipes }),

  toggleLike: (id) =>
    set((state) => ({
      recipes: state.recipes.map((r) =>
        r.id === id ? { ...r, isLiked: !r.isLiked } : r,
      ),
    })),

  renameRecipe: (id, newName) =>
    set((state) => ({
      recipes: state.recipes.map((r) =>
        r.id === id ? { ...r, name: newName } : r,
      ),
    })),

  deleteRecipe: (id) =>
    set((state) => ({
      recipes: state.recipes.filter((r) => r.id !== id),
    })),
}));
