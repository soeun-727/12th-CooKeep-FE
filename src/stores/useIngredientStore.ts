import { create } from "zustand";

interface Ingredient {
  id: number;
  name: string;
  expiration: string;
  image: string;
  category: "냉장" | "냉동" | "상온";
}

interface IngredientState {
  // 1. 데이터 상태
  ingredients: Ingredient[];
  selectedIds: number[];

  // 2. 액션 (수정/삭제/선택)
  toggleSelect: (id: number) => void;
  clearSelection: () => void;
  deleteSelected: () => void; // '다 먹었어요', '버렸어요' 공용
}

export const useIngredientStore = create<IngredientState>((set) => ({
  ingredients: [], // 초기 데이터 (API 호출 등으로 채워짐)
  selectedIds: [],

  toggleSelect: (id) =>
    set((state) => ({
      selectedIds: state.selectedIds.includes(id)
        ? state.selectedIds.filter((sid) => sid !== id)
        : [...state.selectedIds, id],
    })),

  clearSelection: () => set({ selectedIds: [] }),

  deleteSelected: () =>
    set((state) => ({
      ingredients: state.ingredients.filter(
        (item) => !state.selectedIds.includes(item.id)
      ),
      selectedIds: [], // 삭제 후 선택 해제
    })),
}));
