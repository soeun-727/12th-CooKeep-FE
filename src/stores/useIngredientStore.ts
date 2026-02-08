import { create } from "zustand";
import { persist } from "zustand/middleware";
import { deleteIngredients } from "../api/ingredient";

export interface Ingredient {
  id: number;
  name: string;
  image: string;
  category: "냉장" | "냉동" | "상온";
  quantity: number;
  unit: string;
  expiryDate: string;
  createdAt: number;
  dDay: number;
  memo?: string;
  tip?: string;
}

export type SortOrder = "유통기한 임박 순" | "등록 최신 순" | "등록 오래된 순";

interface IngredientState {
  ingredients: Ingredient[];
  selectedIds: number[];
  searchTerm: string;
  viewCategory: string | null;
  sortOrder: SortOrder;
  selectedIngredientId: number | null;
  eatenCount: number;
  setIngredients: (ingredients: Ingredient[]) => void;
  setSearchTerm: (term: string) => void;
  setViewCategory: (category: string | null) => void;
  setSortOrder: (order: SortOrder) => void;
  toggleSelect: (id: number) => void;
  setSelectedFromIngredients: (ingredients: Ingredient[]) => void;
  clearSelection: () => void;
  deleteSelected: (type?: "eaten" | "thrown") => Promise<void>;
  openDetail: (id: number) => void;
  closeDetail: () => void;
  updateIngredient: (updated: Ingredient) => void;
}

export const useIngredientStore = create<IngredientState>()(
  persist(
    (set, get) => ({
      ingredients: [],
      selectedIds: [],
      searchTerm: "",
      viewCategory: null,
      sortOrder: "유통기한 임박 순",
      selectedIngredientId: null,
      eatenCount: 0,
      setIngredients: (ingredients) => set({ ingredients }),
      setSearchTerm: (term) => set({ searchTerm: term }),
      setViewCategory: (category) => set({ viewCategory: category }),
      setSortOrder: (order) => set({ sortOrder: order }),
      toggleSelect: (id) =>
        set((state) => ({
          selectedIds: state.selectedIds.includes(id)
            ? state.selectedIds.filter((sid) => sid !== id)
            : [...state.selectedIds, id],
        })),

      setSelectedFromIngredients: (ingredients) =>
        set({
          selectedIds: ingredients.map((i) => i.id),
        }),

      clearSelection: () => set({ selectedIds: [] }),
      deleteSelected: async (type) => {
        const { selectedIds, ingredients, eatenCount } = get();
        if (selectedIds.length === 0) return;

        try {
          if (type === "thrown") {
            const response = await deleteIngredients({
              userIngredientsIds: selectedIds,
            });

            if (!response.data.success) {
              throw new Error("서버 삭제 실패");
            }
          }
          set({
            ingredients: ingredients.filter((i) => !selectedIds.includes(i.id)),
            selectedIds: [],
            eatenCount:
              type === "eaten" ? eatenCount + selectedIds.length : eatenCount,
          });
        } catch (error) {
          console.error("재료 삭제 중 오류 발생:", error);
          alert("재료를 처리하는 중 오류가 발생했습니다. 다시 시도해 주세요.");
          throw error;
        }
      },
      openDetail: (id) => set({ selectedIngredientId: id }),
      closeDetail: () => set({ selectedIngredientId: null }),
      updateIngredient: (updated) =>
        set((state) => ({
          ingredients: state.ingredients.map((i) =>
            i.id === updated.id ? updated : i,
          ),
        })),
    }),
    {
      name: "ingredient-store",
      partialize: (state) => ({
        ingredients: state.ingredients,
        eatenCount: state.eatenCount,
      }),
    },
  ),
);
