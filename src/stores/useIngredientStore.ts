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
  /** 데이터 */
  ingredients: Ingredient[];

  /** ✅ 선택 관련 (통합) */
  selectedIds: number[];

  /** UI 상태 */
  searchTerm: string;
  viewCategory: string | null;
  sortOrder: SortOrder;

  /** 상세 */
  selectedIngredientId: number | null;

  /** 통계 */
  eatenCount: number;

  /** setters */
  setIngredients: (ingredients: Ingredient[]) => void;
  setSearchTerm: (term: string) => void;
  setViewCategory: (category: string | null) => void;
  setSortOrder: (order: SortOrder) => void;

  /** ✅ 선택 액션 */
  toggleSelect: (id: number) => void;
  setSelectedFromIngredients: (ingredients: Ingredient[]) => void;
  clearSelection: () => void;

  /** 비즈니스 액션 */
  deleteSelected: (type?: "eaten" | "thrown") => Promise<void>;

  /** 상세 */
  openDetail: (id: number) => void;
  closeDetail: () => void;

  /** 수정 */
  updateIngredient: (updated: Ingredient) => void;
}

export const useIngredientStore = create<IngredientState>()(
  persist(
    (set, get) => ({
      ingredients: TEMP_DATA,

      /** 선택 */
      selectedIds: [],

      /** UI */
      searchTerm: "",
      viewCategory: null,
      sortOrder: "유통기한 임박 순",

      /** 상세 */
      selectedIngredientId: null,

      /** 통계 */
      eatenCount: 0,

      /** setters */
      setIngredients: (ingredients) => set({ ingredients }),
      setSearchTerm: (term) => set({ searchTerm: term }),
      setViewCategory: (category) => set({ viewCategory: category }),
      setSortOrder: (order) => set({ sortOrder: order }),

      /** ✅ 선택 로직 */
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

      /** 삭제 / 섭취 */
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

      /** 상세 */
      openDetail: (id) => set({ selectedIngredientId: id }),
      closeDetail: () => set({ selectedIngredientId: null }),

      /** 수정 */
      updateIngredient: (updated) =>
        set((state) => ({
          ingredients: state.ingredients.map((i) =>
            i.id === updated.id ? updated : i,
          ),
        })),
    }),
    {
      name: "ingredient-store",
      /** ❗ 선택 상태는 persist 안 함 */
      partialize: (state) => ({
        ingredients: state.ingredients,
        eatenCount: state.eatenCount,
      }),
    },
  ),
);
