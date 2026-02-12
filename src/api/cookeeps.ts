import api from "./axios";

export interface RecipeRankItem {
  dailyRecipeId: number;
  likeCount: number;
  rank: number;
  recipeImageUrl: string | null;
  title: string;
}

export interface WateringRankItem {
  nickname: string;
  profileImageUrl: string;
  rank: number;
}

export interface RankingResponse {
  recipeRanking: RecipeRankItem[];
  wateringRanking: WateringRankItem[];
}

/** [GET] 이번 주 랭킹 조회 (물주기 Top 3, 레시피 좋아요 Top 3) */
export const getWeeklyRanking = async () => {
  const res = await api.get<{ data: RankingResponse }>("/api/cookeeps/ranking");
  return res.data.data;
};
