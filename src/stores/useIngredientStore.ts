import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TEMP_DATA } from "../constants/tempIngredients";

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
  clearSelection: () => void;
  deleteSelected: (type?: "eaten" | "thrown") => Promise<void>;

  openDetail: (id: number) => void;
  closeDetail: () => void;
  updateIngredient: (updated: Ingredient) => void;
}

export const useIngredientStore = create<IngredientState>()(
  persist(
    (set, get) => ({
      ingredients: TEMP_DATA,
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

      clearSelection: () => set({ selectedIds: [] }),

      deleteSelected: async (type) => {
        await new Promise((r) => setTimeout(r, 150));
        const { selectedIds, eatenCount } = get();

        set((state) => ({
          ingredients: state.ingredients.filter(
            (i) => !selectedIds.includes(i.id),
          ),
          selectedIds: [],
          eatenCount:
            type === "eaten" ? eatenCount + selectedIds.length : eatenCount,
        }));
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
