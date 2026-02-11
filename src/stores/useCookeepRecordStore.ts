import { create } from "zustand";
import type { CookeepRecord } from "../types/record";
import { MOCK_RECORDS } from "../constants/recordMock";
export interface RecordImage {
  url: string;
  file?: File;
}

interface RecordState {
  selectedRecipeId: number | null;
  editingRecordId: string | null;
  title: string;
  memo: string;
  isPublic: boolean | null;
  images: RecordImage[];

  setSelectedRecipeId: (id: number) => void;
  setEditingRecordId: (id: string | null) => void;
  setTitle: (title: string) => void;
  setMemo: (memo: string) => void;
  setIsPublic: (value: boolean) => void;

  addImages: (newImages: RecordImage[]) => void;
  removeImage: (index: number) => void;
  resetRecord: () => void;

  records: CookeepRecord[];
  addRecord: (record: CookeepRecord) => void;
  updateRecordRecipe: (args: {
    recordId: string;
    recipeId: number;
    recipeTitle: string;
  }) => void;
  updateRecordContent: (args: {
    recordId: string;
    memo: string;
    images: RecordImage[];
    isPublic: boolean | null;
  }) => void;
  updateRecordVisibility: (recordId: string, isPublic: boolean) => void;
}

export const useCookeepRecordStore = create<RecordState>((set) => ({
  selectedRecipeId: null,
  editingRecordId: null,
  title: "",
  memo: "",
  isPublic: null,
  images: [],
  records: MOCK_RECORDS,

  setSelectedRecipeId: (id) => set({ selectedRecipeId: id }),
  setEditingRecordId: (id) => set({ editingRecordId: id }),
  setTitle: (title) => set({ title }),
  setMemo: (memo) => set({ memo }),
  setIsPublic: (value) => set({ isPublic: value }),

  addImages: (newImages) =>
    set((state) => ({
      images: [...state.images, ...newImages].slice(0, 2),
    })),

  removeImage: (index) =>
    set((state) => ({
      images: state.images.filter((_, i) => i !== index),
    })),

  resetRecord: () =>
    set({
      selectedRecipeId: null,
      editingRecordId: null,
      title: "",
      memo: "",
      isPublic: null,
      images: [],
    }),

  addRecord: (record) =>
    set((state) => ({
      records: [record, ...state.records],
    })),

  updateRecordRecipe: ({ recordId, recipeId, recipeTitle }) =>
    set((state) => ({
      records: state.records.map((r) =>
        r.id === recordId ? { ...r, recipeId, recipeTitle } : r,
      ),
    })),

  updateRecordContent: ({ recordId, memo, images, isPublic }) =>
    set((state) => ({
      records: state.records.map((r) =>
        r.id === recordId
          ? {
              ...r,
              memo,
              images,
              isPublic: isPublic ?? r.isPublic,
            }
          : r,
      ),
    })),

  updateRecordVisibility: (recordId, isPublic) =>
    set((state) => ({
      records: state.records.map((r) =>
        r.id === recordId ? { ...r, isPublic } : r,
      ),
    })),
}));
