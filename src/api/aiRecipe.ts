import axios from "axios";
import type { AiRecipeResponse, Difficulty } from "../types/aiRecipe";

interface GenerateAiRecipeRequest {
  ingredientIds?: number[];
  difficulty?: Difficulty;
  sessionId?: number;
}

export const generateAiRecipe = async (
  body: GenerateAiRecipeRequest,
): Promise<AiRecipeResponse> => {
  const response = await axios.post("/api/users/me/ai/recipes", body);

  return response.data;
};
