import { create } from "zustand";

export interface Ingredient {
  id: number;
  name: string;
  expiration: string;
  image: string;
  category: "냉장" | "냉동" | "상온";
  createdAt: number;
  tip?: string; // 추가
}

export type SortOrder = "유통기한 임박 순" | "등록 최신 순" | "등록 오래된 순";
interface IngredientState {
  // 데이터 상태
  ingredients: Ingredient[];
  selectedIds: number[];
  searchTerm: string;
  viewCategory: string | null;
  sortOrder: SortOrder;
  selectedIngredient: Ingredient | null; // 상세정보 추가

  // 액션
  setIngredients: (ingredients: Ingredient[]) => void; // 데이터 초기화 액션 추가
  setSearchTerm: (term: string) => void;
  setViewCategory: (category: string | null) => void;
  setSortOrder: (order: SortOrder) => void;
  toggleSelect: (id: number) => void;
  clearSelection: () => void;
  deleteSelected: (type?: "eaten" | "thrown") => Promise<void>;
  eatenCount: number; //추후엔 API 연동할 듯

  // 상세정보부분 추가
  openDetail: (ingredient: Ingredient) => void;
  closeDetail: () => void;
  updateIngredient: (updated: Ingredient) => void;
}

export const useIngredientStore = create<IngredientState>((set, get) => ({
  ingredients: [],
  selectedIds: [],
  searchTerm: "",
  viewCategory: null,
  sortOrder: "유통기한 임박 순",
  eatenCount: 0,
  setSearchTerm: (term) => set({ searchTerm: term }),
  // 데이터를 스토어에 저장하는 함수
  setIngredients: (ingredients) => set({ ingredients }),
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
    await new Promise((resolve) => setTimeout(resolve, 150));

    const { selectedIds, eatenCount } = get();

    set((state) => ({
      eatenCount:
        type === "eaten" ? eatenCount + selectedIds.length : eatenCount,
      ingredients: state.ingredients.filter(
        (item) => !selectedIds.includes(item.id),
      ),
      selectedIds: [],
    }));
  },

  // 상세정보부분 추가
  selectedIngredient: null,

  openDetail: (ingredient) => set({ selectedIngredient: ingredient }),

  closeDetail: () => set({ selectedIngredient: null }),

  updateIngredient: (updated) =>
    set((state) => ({
      ingredients: state.ingredients.map((i) =>
        i.id === updated.id ? updated : i,
      ),
      selectedIngredient: updated, // 모달 열려 있으면 즉시 반영
    })),
}));
