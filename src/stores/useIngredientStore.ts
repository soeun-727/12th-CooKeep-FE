import { create } from "zustand";

export interface Ingredient {
  id: number;
  name: string;
  expiration: string;
  image: string;
  category: "냉장" | "냉동" | "상온";
}

interface IngredientState {
  // 데이터 상태
  ingredients: Ingredient[];
  selectedIds: number[];

  // 액션
  setIngredients: (ingredients: Ingredient[]) => void; // 데이터 초기화 액션 추가
  toggleSelect: (id: number) => void;
  clearSelection: () => void;
  deleteSelected: (type?: "eaten" | "thrown") => Promise<void>;
}

export const useIngredientStore = create<IngredientState>((set) => ({
  ingredients: [],
  selectedIds: [],

  // 데이터를 스토어에 저장하는 함수
  setIngredients: (ingredients) => set({ ingredients }),

  toggleSelect: (id) =>
    set((state) => ({
      selectedIds: state.selectedIds.includes(id)
        ? state.selectedIds.filter((sid) => sid !== id)
        : [...state.selectedIds, id],
    })),

  clearSelection: () => set({ selectedIds: [] }),

  deleteSelected: async (type) => {
    // 1. 0.15초 대기 (버튼의 active 효과/안쪽 그림자를 보여주기 위함)
    await new Promise((resolve) => setTimeout(resolve, 150));

    const { selectedIds, eatenCount } = get();

    set((state) => ({
      // 2. 카운트 로직: '다 먹었어요' 클릭 시에만 누적
      eatenCount:
        type === "eaten" ? eatenCount + selectedIds.length : eatenCount,
      // 3. 실제 데이터 삭제
      ingredients: state.ingredients.filter(
        (item) => !selectedIds.includes(item.id)
      ),
      // 4. 선택 해제
      selectedIds: [],
    }));
  },
}));
