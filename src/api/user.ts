// src/api/user.ts
import api from "./axios";
// src/api/user.ts

import type { GoalActionType } from "../utils/mapping";

export interface UpdateGoalRequest {
  goalActionType: GoalActionType;
  targetCount: number;
}

// 주간 목표 재설정 API
export const updateWeeklyGoal = async (data: UpdateGoalRequest) => {
  const res = await api.post("/api/my-cookeep/weekly-goal", data);
  return res.data;
};

export interface OnboardingData {
  favoriteFoodTypes: string[];
  cookingLevel: string;
  goalActionType: string;
  targetCount: number;
}

// src/api/user.ts 에 추가

export interface ProfileData {
  daysSinceJoined: number;
  nickname: string;
  profilePlantImageUrl: string;
  weeklyGoal: {
    achieved: boolean;
    currentCount: number;
    goalActionType: "COOKING" | "RECIPE_SAVE"; // 상황에 맞게 타입을 확장하세요
    targetCount: number;
  };
}

export interface ProfileResponse {
  status: string;
  timestamp: string;
  data: ProfileData;
}

// 프로필 정보 조회 API
export const getProfileInfo = async (): Promise<ProfileResponse> => {
  const res = await api.get<ProfileResponse>("/api/my-cookeep/profile");
  return res.data;
};

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
