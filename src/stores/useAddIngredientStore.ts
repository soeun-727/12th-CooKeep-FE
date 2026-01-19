import { create } from "zustand";

export interface MasterItem {
  id: number | string;
  name: string;
  image: string;
  categoryId: number;
}

interface AddIngredientState {
  searchTerm: string;
  selectedCategoryId: number;
  selectedItems: MasterItem[];
  historyItems: MasterItem[];

  setSearchTerm: (term: string) => void;
  setCategoryId: (id: number) => void;
  toggleItem: (item: MasterItem) => void;
  resetSelected: () => void;
  // 이름을 컴포넌트 호출부와 일치하도록 수정했습니다.
  setHistoryItems: (items: MasterItem[]) => void;
}

export const useAddIngredientStore = create<AddIngredientState>((set) => ({
  searchTerm: "",
  selectedCategoryId: 1,
  selectedItems: [],
  historyItems: [],

  setSearchTerm: (term) => set({ searchTerm: term }),

  setCategoryId: (id) => set({ selectedCategoryId: id, searchTerm: "" }),

  toggleItem: (item) =>
    set((state) => {
      const isExist = state.selectedItems.find((i) => i.id === item.id);
      return {
        selectedItems: isExist
          ? state.selectedItems.filter((i) => i.id !== item.id)
          : [...state.selectedItems, item],
      };
    }),

  resetSelected: () => set({ selectedItems: [] }),

  setHistoryItems: (items) => set({ historyItems: items }),
}));
