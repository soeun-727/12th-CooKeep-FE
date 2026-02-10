// src/api/user.ts
import api from "./axios";

export interface OnboardingData {
  favoriteFoodTypes: string[] | null;
  cookingLevel: string | null;
  goalActionType: string | null;
  targetCount: number | null;
}

export const saveOnboardingInfo = (data: OnboardingData) => {
  return api.post("/api/users/me/onboarding", data);
};

export const updatePushConsent = (marketingConsent: boolean) => {
  return api.patch("/api/users/me/onboarding/push", { marketingConsent });
};

export const updateNickname = async (nickname: string) => {
  const res = await api.patch("/api/users/me/nickname", {
    nickname,
  });

  return res.data;
};
