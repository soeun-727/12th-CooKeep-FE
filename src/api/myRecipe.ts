import api from "./axios";
import { IngredientsJson, YoutubeVideo } from "./dailyAiRecipe";

// 서버에서 내려주는 데이터의 타입 정의
export interface CalendarRecipe {
  date: string; // 예: "2026-02-08"
  recipeImageUrl: string;
}

export interface CalendarRecipesResponse {
  status: string;
  data: CalendarRecipe[];
}

// src/api/myRecipe.ts 에 추가

export interface DailyRecipe {
  dailyRecipeId: number;
  title: string;
  recipeImageUrl: string;
  isPublic: boolean;
  createdAt: string; // "2026-02-09T03:01:41..."
}

export interface DailyRecipesResponse {
  status: string;
  data: DailyRecipe[];
}
// src/api/myRecipe.ts 에 추가

export interface CreateDailyRecipeRequest {
  aiRecipeId: number; // 필수
  isPublic: boolean; // 필수
  title?: string; // 선택 (미입력 시 기존 AI 레시피 제목 사용)
  description?: string; // 선택 (한줄평)
  recipeImageUrl?: string; // 선택 (요리 사진)
}

export interface CreateDailyRecipeResponse {
  status: string;
  data: {
    dailyRecipeId: number;
    title: string;
    message: string;
    createdAt: string;
  };
}

export interface MyRecipeDetail {
  dailyRecipeId: number;
  title: string;
  description: string;
  recipeImageUrl: string;
  isPublic: boolean;
  createdAt: string;
  content: {
    ingredients: IngredientsJson;
    steps: string[];
    youtubeReferences: YoutubeVideo[];
  };
}

export interface MyRecipeDetailResponse {
  status: string;
  data: MyRecipeDetail;
}

export interface UpdateDailyRecipeRequest {
  title?: string;
  description?: string;
}

/** [PATCH] 데일리 레시피 수정 (제목, 한줄평) */
export const updateDailyRecipe = async (
  dailyRecipeId: number,
  data: UpdateDailyRecipeRequest,
) => {
  const res = await api.patch<MyRecipeDetailResponse>(
    `/api/users/me/daily-recipes/${dailyRecipeId}`,
    data,
  );
  return res.data;
};

/** [GET] 내 데일리 레시피 상세 조회 */
export const getMyRecipeDetail = async (dailyRecipeId: number) => {
  const res = await api.get<MyRecipeDetailResponse>(
    `/api/users/me/daily-recipes/${dailyRecipeId}`,
  );
  return res.data;
};

/** [POST] 데일리 레시피 등록 */
export const createDailyRecipe = async (data: CreateDailyRecipeRequest) => {
  const res = await api.post<CreateDailyRecipeResponse>(
    "/api/users/me/daily-recipes",
    data,
  );
  return res.data;
};

/** [GET] 특정 날짜의 데일리 레시피 목록 조회 */
export const getDailyRecipesByDate = async (date: string) => {
  const res = await api.get<DailyRecipesResponse>(
    "/api/users/me/daily-recipes",
    {
      params: { date }, // date=YYYY-MM-DD
    },
  );
  return res.data;
};

/** [PATCH] 데일리 레시피 공개 범위 수정 */
export const updateRecipeVisibility = async (
  dailyRecipeId: number,
  isPublic: boolean,
) => {
  const res = await api.patch<{ status: string }>(
    `/api/users/me/daily-recipes/${dailyRecipeId}/visibility`,
    { isPublic },
  );
  return res.data;
};

/** [GET] 캘린더 마킹용 리스트 조회 */
export const getCalendarRecipes = async (year: number, month: number) => {
  const res = await api.get<CalendarRecipesResponse>(
    "/api/users/me/daily-recipes/calendar",
    { params: { year, month } },
  );
  return res.data;
};
