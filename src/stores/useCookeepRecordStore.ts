import { create } from "zustand";
import type { CookeepRecord, ImageWithUrl } from "../types/record";
import { MOCK_RECORDS } from "../constants/recordMock";

export interface RecordImage {
  file: File;
  url: string;
}

export interface RecordImage extends ImageWithUrl {
  file: File;
}

interface RecordState {
  selectedRecipeId: number | null;

  // 추가
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

  addImages: (files: File[]) => void;
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
  // records: [], 우선 임시데이터로

  setSelectedRecipeId: (id) => set({ selectedRecipeId: id }),
  setEditingRecordId: (id) => set({ editingRecordId: id }),

  setTitle: (title) => set({ title }),
  setMemo: (memo) => set({ memo }),
  setIsPublic: (value) => set({ isPublic: value }),

  addImages: (files) =>
    set((state) => ({
      images: [
        ...state.images,
        ...files.map((file) => ({
          file,
          url: URL.createObjectURL(file),
        })),
      ].slice(0, 2),
    })),

  removeImage: (index) =>
    set((state) => {
      const target = state.images[index];
      if (target) URL.revokeObjectURL(target.url);

      return {
        images: state.images.filter((_, i) => i !== index),
      };
    }),

  // resetRecord: () =>
  //   set((state) => {
  //     state.images.forEach((img) => URL.revokeObjectURL(img.url));

  //     return {
  //       selectedRecipeId: null,
  //       editingRecordId: null,
  //       title: "",
  //       memo: "",
  //       isPublic: null,
  //       images: [],
  //     };
  //   }),

  // store 내 수정
  resetRecord: () =>
    set({
      selectedRecipeId: null,
      editingRecordId: null,
      title: "",
      memo: "",
      isPublic: null,
      images: [], // 일단 URL 해제 로직을 주석 처리하고 테스트해보세요.
    }),

  addRecord: (record) =>
    set((state) => ({
      records: [record, ...state.records],
    })),

  // 핵심
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
