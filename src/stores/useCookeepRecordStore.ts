// import { create } from "zustand";
// import type { Recipe } from "../types/recipe";

// export interface RecipeSnapshot {
//   recipeId: number; // ⭐ 어떤 레시피에서 왔는지
//   recipe: Recipe; // ⭐ 그 당시 레시피 복사본
// }

// /** 기록 작성 중 Draft */
// export interface CookeepRecordDraft {
//   date: string; // yyyy-mm-dd
//   recipeId: number | null;
//   recipeSnapshot: RecipeSnapshot | null;
//   memo: string;
//   images: File[];
//   isPublic: boolean;
// }

// interface CookeepRecordState {
//   draft: CookeepRecordDraft;

//   /** actions */
//   setSelectedRecipe: (recipe: RecipeSnapshot) => void;
//   setMemo: (memo: string) => void;
//   setImages: (images: File[]) => void;
//   togglePublic: () => void;
//   resetDraft: () => void;
// }

// export const useCookeepRecordStore = create<CookeepRecordState>((set) => ({
//   draft: {
//     date: new Date().toISOString().slice(0, 10),
//     recipeId: null,
//     recipeSnapshot: null,
//     memo: "",
//     images: [],
//     isPublic: false,
//   },

//   setSelectedRecipe: (recipe) =>
//     set({
//       draft: {
//         date: new Date().toISOString().slice(0, 10),
//         recipeId: recipe.recipeId,
//         recipeSnapshot: recipe,
//         memo: "",
//         images: [],
//         isPublic: false,
//       },
//     }),

//   setMemo: (memo) =>
//     set((state) => ({
//       draft: {
//         ...state.draft,
//         memo,
//       },
//     })),

//   setImages: (images) =>
//     set((state) => ({
//       draft: {
//         ...state.draft,
//         images,
//       },
//     })),

//   togglePublic: () =>
//     set((state) => ({
//       draft: {
//         ...state.draft,
//         isPublic: !state.draft.isPublic,
//       },
//     })),

//   resetDraft: () =>
//     set({
//       draft: {
//         date: new Date().toISOString().slice(0, 10),
//         recipeId: null,
//         recipeSnapshot: null,
//         memo: "",
//         images: [],
//         isPublic: false,
//       },
//     }),
// }));

import { create } from "zustand";

interface RecordState {
  selectedRecipeId: number | null;

  title: string; // 추가
  memo: string;
  isPublic: boolean | null;
  images: File[]; // 추가

  setSelectedRecipeId: (id: number) => void;
  setTitle: (title: string) => void;
  setMemo: (memo: string) => void;
  setIsPublic: (value: boolean) => void;

  addImages: (files: File[]) => void;
  removeImage: (index: number) => void;

  resetRecord: () => void;
}

export const useCookeepRecordStore = create<RecordState>((set) => ({
  selectedRecipeId: null,

  title: "",
  memo: "",
  isPublic: null, // 초기값
  images: [],

  setSelectedRecipeId: (id) => set({ selectedRecipeId: id }),
  setTitle: (title) => set({ title }),
  setMemo: (memo) => set({ memo }),
  setIsPublic: (value) => set({ isPublic: value }),

  addImages: (files) =>
    set((state) => ({
      images: [...state.images, ...files],
    })),

  removeImage: (index) =>
    set((state) => ({
      images: state.images.filter((_, i) => i !== index),
    })),

  resetRecord: () =>
    set({
      selectedRecipeId: null,
      title: "",
      memo: "",
      isPublic: false,
      images: [],
    }),
}));
