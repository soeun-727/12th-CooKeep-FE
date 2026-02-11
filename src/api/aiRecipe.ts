import api from "./axios";
import type { AiRecipeResponse, Difficulty } from "../types/aiRecipe";

interface GenerateAiRecipeRequest {
  ingredientIds?: number[];
  difficulty?: Difficulty;
  sessionId?: number;
}

export const generateAiRecipe = async (
  body: GenerateAiRecipeRequest,
): Promise<AiRecipeResponse> => {
  const response = await api.post(
    "/api/users/me/ai/recipes",
    body,
    { timeout: 60000 }, // 여기만 60초
  );

  return response.data;
};
