// src/stores/useRecipeFlowStore.ts
import { create } from "zustand";
import type { Ingredient } from "./useIngredientStore";
import type { AiRecipeResponse, Difficulty } from "../types/aiRecipe";
import {
  completeAiRecipe,
  generateAiRecipe,
  retryAiRecipe,
} from "../api/aiRecipe";
import { getAiSessionDetail } from "../api/aiSession";

type RecipeFlowState = {
  selectedIngredients: Ingredient[];
  difficulty: Difficulty | null;

  sessionId: number | null;
  retryCount: number;

  recipeHistory: AiRecipeResponse[];

  isLoading: boolean;
  error: string | null;

  setSelectedIngredients: (items: Ingredient[]) => void;
  setDifficulty: (d: Difficulty) => void;
  generateRecipe: () => Promise<void>;
  reset: () => void;

  fetchSessionDetail: (sessionId: number) => Promise<void>;
  completeSession: () => Promise<void>; // 타입 정의 추가

  // 작동안해서 넣어놓음
  // clearSelection: () => void;
};

export const useRecipeFlowStore = create<RecipeFlowState>((set, get) => ({
  selectedIngredients: [],
  difficulty: null,

  sessionId: null,
  retryCount: 0,

  recipeHistory: [],

  isLoading: false,
  error: null,

  setSelectedIngredients: (items) => set({ selectedIngredients: items }),

  setDifficulty: (difficulty) => set({ difficulty }),

  // generateRecipe: async () => {
  //   const { selectedIngredients, difficulty, sessionId, recipeHistory } = get();

  //   if (!difficulty) return;

  //   try {
  //     const body =
  //       sessionId === null
  //         ? {
  //             ingredientIds: selectedIngredients.map((i) => i.id),
  //             difficulty,
  //           }
  //         : {
  //             sessionId,
  //           };

  //     const response = await generateAiRecipe(body);

  //     set({
  //       sessionId: response.sessionId,
  //       retryCount: response.changeCount,
  //       recipeHistory: [...recipeHistory, response],
  //     });
  //   } catch (error) {
  //     console.error("AI 레시피 생성 실패:", error);
  //     throw error;
  //   }
  // },
  generateRecipe: async () => {
    const { selectedIngredients, difficulty, sessionId, recipeHistory } = get();

    if (!difficulty) return;

    try {
      set({ isLoading: true, error: null }); // 로딩 시작

      let response: AiRecipeResponse;

      if (sessionId === null) {
        // 처음 생성 시
        response = await generateAiRecipe({
          ingredientIds: selectedIngredients.map((i) => i.id),
          difficulty,
        });
      } else {
        // 재요청(Retry) 시
        response = await retryAiRecipe({
          sessionId,
          difficulty,
          ingredientIds: selectedIngredients.map((i) => i.id),
        });
      }

      set({
        sessionId: response.sessionId,
        retryCount: response.changeCount,
        recipeHistory: [...recipeHistory, response],
        isLoading: false, // 로딩 종료
      });
    } catch (error) {
      console.error("AI 레시피 생성 실패:", error);
      set({ isLoading: false });
      throw error;
    }
  },

  reset: () =>
    set({
      selectedIngredients: [],
      difficulty: null,
      sessionId: null,
      retryCount: 0,
      recipeHistory: [],
      error: null,
    }),

  fetchSessionDetail: async (sessionId: number) => {
    try {
      set({ isLoading: true });
      const data = await getAiSessionDetail(sessionId);

      // AI가 응답한 content(JSON 문자열)를 AiRecipeResponse 구조로 변환
      const parsedHistory: AiRecipeResponse[] = data.messages
        .filter((msg) => msg.role === "AI")
        .map((msg) => {
          try {
            const parsed = JSON.parse(msg.content);

            // API 응답의 content 내부에 이미 sessionId 등이 포함되어 있다면 그대로 사용,
            // 만약 recipe 정보만 들어있다면 형식을 맞춰줍니다.
            return {
              sessionId: data.sessionId,
              changeCount: 0, // 상세 조회 시점에서는 기본값 설정
              recipe: parsed.recipe || parsed,
              youtubeReferences: parsed.youtubeReferences || [],
            };
          } catch (e) {
            console.error("JSON 파싱 에러:", e);
            return null;
          }
        })
        .filter((item): item is AiRecipeResponse => item !== null);

      set({
        sessionId,
        recipeHistory: parsedHistory,
        isLoading: false,
      });
    } catch (error) {
      console.error("세션 상세 조회 실패:", error);
      set({ isLoading: false });
    }
  },

  completeSession: async () => {
    const { sessionId } = get();
    if (!sessionId) {
      console.error("세션 ID가 없습니다.");
      return;
    }

    try {
      set({ isLoading: true });
      await completeAiRecipe(sessionId);
      // 필요하다면 여기서 초기화를 하거나, 성공 메시지를 상태에 저장할 수 있습니다.
      set({ isLoading: false });
    } catch (error) {
      console.error("레시피 채택 실패:", error);
      set({ isLoading: false });
      throw error;
    }
  },
  // clearSelection: () =>
  //   set({
  //     selectedIngredients: [],
  //   }),
}));
