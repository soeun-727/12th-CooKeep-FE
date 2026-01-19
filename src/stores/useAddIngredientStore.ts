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
  isModalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  setSearchTerm: (term: string) => void;
  setCategoryId: (id: number) => void;
  toggleItem: (item: MasterItem) => void;
  resetSelected: () => void;
  setHistoryItems: (items: MasterItem[]) => void;
}

export const useAddIngredientStore = create<AddIngredientState>((set) => ({
  searchTerm: "",
  selectedCategoryId: 1,
  selectedItems: [],
  historyItems: [],
  isModalOpen: false,
  setModalOpen: (open) => set({ isModalOpen: open }),
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
