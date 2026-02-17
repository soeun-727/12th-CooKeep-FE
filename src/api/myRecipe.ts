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
  createdAt: string;
  liked: boolean;
  likeCount: number;
  bookmarked: boolean;
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

// api/myRecipe.ts

export interface MyLikedRecipeItem {
  dailyRecipeId: number;
  title: string;
  likeCount: number;
  recipeImageUrl: string | null;
  rank: number;
}

export interface MyLikedRecipesResponse {
  content: MyLikedRecipeItem[];
  totalPages: number;
  totalElements: number;
  last: boolean; // ★ 무한 스크롤 중단 판별용
  number: number; // 현재 페이지 번호
  size: number;
}

/** [GET] 내가 좋아요 누른 레시피 목록 조회 (무한 스크롤용) */
export const getMyLikedRecipes = async (
  page: number = 0,
  size: number = 10,
) => {
  const res = await api.get<{ data: MyLikedRecipesResponse }>(
    "/api/daily-recipes/likes/my",
    { params: { page, size } },
  );
  return res.data.data;
};

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

/** [DELETE] 데일리 레시피 삭제 */
export const deleteDailyRecipe = async (dailyRecipeId: number) => {
  const res = await api.delete<{ status: string }>(
    `/api/users/me/daily-recipes/${dailyRecipeId}`,
  );
  return res.data;
};

/** [POST] 데일리 레시피 좋아요 토글 */
export const toggleRecipeLike = async (dailyRecipeId: number) => {
  if (!dailyRecipeId) throw new Error("레시피 ID가 유효하지 않습니다.");
  const res = await api.post<{
    status: string;
    data: {
      dailyRecipeId: number;
      likeCount: number;
      liked: boolean;
    };
  }>(`/api/daily-recipes/likes/${dailyRecipeId}/toggle`);

  return res.data; // { status: "OK", data: { liked: true, ... } } 형태로 반환됨
};

/** [POST] 데일리 레시피 북마크 토글 */
export const toggleRecipeBookmark = async (dailyRecipeId: number) => {
  const res = await api.post<{
    status: string;
    data: {
      bookmarked: boolean;
      dailyRecipeId: number;
    };
  }>(`/api/daily-recipes/bookmarks/${dailyRecipeId}/toggle`);
  return res.data;
};

/** [GET] 내가 북마크한 레시피 목록 조회 */
export const getMyBookmarkedRecipes = async (
  page: number = 0,
  size: number = 10,
) => {
  const res = await api.get<{ data: MyLikedRecipesResponse }>(
    "/api/daily-recipes/bookmarks/my",
    { params: { page, size } },
  );
  return res.data.data;
};

/** [GET] 특정 레시피의 좋아요 상태 및 개수 확인 */
export const checkRecipeLikeStatus = async (dailyRecipeId: number) => {
  const res = await api.get<{
    status: string;
    data: {
      dailyRecipeId: number;
      likeCount: number;
      liked: boolean;
    };
  }>(`/api/daily-recipes/likes/${dailyRecipeId}/check`);
  return res.data.data;
};

/** [GET] 특정 레시피의 북마크 상태 확인 */
export const checkRecipeBookmarkStatus = async (dailyRecipeId: number) => {
  const res = await api.get<{
    status: string;
    data: {
      bookmarked: boolean;
      dailyRecipeId: number;
    };
  }>(`/api/daily-recipes/bookmarks/${dailyRecipeId}/check`);
  return res.data.data;
};
