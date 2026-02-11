import api from "./axios";

export interface DailyAiRecipe {
  aiRecipeId: number;
  title: string;
  isPinned: boolean;
  createdAt: string;
}

export const getDailyAiRecipes = async (): Promise<DailyAiRecipe[]> => {
  const res = await api.get("/api/users/me/daily-recipes/ai-recipes");
  return res.data.data;
};
