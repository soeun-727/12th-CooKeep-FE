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

/** [POST] 약관 동의 여부 저장 */
export const updateAgreements = (marketingConsent: boolean) => {
  return api.post<{ status: string; timestamp: string }>(
    `/api/users/me/agreements`,
    { marketingConsent },
  );
};
