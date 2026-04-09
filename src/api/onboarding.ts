// src/api/onboarding.ts
import api from "./axios";

export interface OnboardingIngredient {
  defaultIngredientId: number;
  ingredient: string; // 재료 이름
}

export interface OnboardingResponse {
  status: string;
  timestamp: string;
  data: {
    ingredients: OnboardingIngredient[];
  };
}

export const getOnboardingIngredients = () => {
  return api.get<OnboardingResponse>("/api/users/me/onboarding/ingredients");
};
