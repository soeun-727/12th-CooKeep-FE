// src/api/user.ts
import api from "./axios";

export interface OnboardingData {
  favoriteFoodTypes: string[];
  cookingLevel: string;
  goalActionType: string;
  targetCount: number;
}

export const saveOnboardingInfo = (data: OnboardingData) => {
  return api.post("/api/users/me/onboarding", data);
};

export const updatePushConsent = (marketingConsent: boolean) => {
  return api.patch("/api/users/me/onboarding/push", { marketingConsent });
};
