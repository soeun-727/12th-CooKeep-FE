import api from "./axios";
import type { GoalActionType } from "../utils/mapping";

/** 타입 정의 */
export interface UpdateGoalRequest {
  goalActionType: GoalActionType;
  targetCount: number;
}

export interface OnboardingData {
  favoriteFoodTypes: string[] | null;
  cookingLevel: string | null;
  goalActionType: string | null;
  targetCount: number | null;
}

export interface ProfileData {
  daysSinceJoined: number;
  growingPlantName: string;
  nickname: string;
  profilePlantImageUrl: string;
  weeklyGoal: {
    achieved: boolean;
    currentCount: number;
    goalActionType:
      | "COOKING"
      | "RECIPE_SAVE"
      | "RECIPE_LIKE"
      | "INGREDIENT_MANAGEMENT";
    targetCount: number;
  };
}

export interface ProfileResponse {
  status: string;
  timestamp: string;
  data: ProfileData;
}

export interface MyProfileResponse {
  status: string;
  timestamp: string;
  data: {
    Nickname: string;
    phoneNumber: string;
    email: string;
    // authProvider: "LOCAL" | "KAKAO" | "GOOGLE" | string;
    authProvider: "LOCAL" | "KAKAO" | "GOOGLE";
    marketingPush: boolean;
  };
}

/** API 함수들 */

// 1. 주간 목표 재설정 API
export const updateWeeklyGoal = async (data: UpdateGoalRequest) => {
  const res = await api.post("/api/my-cookeep/weekly-goal", data);
  return res.data;
};

// 2. 프로필 정보 조회 API
export const getProfileInfo = async (): Promise<ProfileResponse> => {
  const res = await api.get<ProfileResponse>("/api/my-cookeep/profile");
  return res.data;
};

// 3. 온보딩 정보 저장 API
export const saveOnboardingInfo = (data: OnboardingData) => {
  return api.post("/api/users/me/onboarding", data);
};

// 4. [POST] 약관 동의 여부 저장 (소셜 로그인 회원 대상)
export const updateAgreements = (marketingConsent: boolean) => {
  return api.patch<{ status: string; timestamp: string }>(
    `/api/users/me/agreements`,
    { marketingConsent },
  );
};

// 5. 닉네임 수정 API
export const updateNickname = async (nickname: string) => {
  const res = await api.patch("/api/users/me/nickname", {
    nickname,
  });
  return res.data;
};

// 6. (참고) 푸시 알림 동의 수정 API (기존 기능 유지 시)
export const updatePushConsent = (marketingConsent: boolean) => {
  return api.patch("/api/users/me/onboarding/push", { marketingConsent });
};

/** [GET] 유통기한 임박 식재료 존재 여부 확인 (팝업 노출 자격) */
export const getPushEligibility = async () => {
  const res = await api.get<{
    status: string;
    data: { eligible: boolean };
  }>("/api/users/me/push/eligibility");

  return res.data.data; // { eligible: true / false }
};
// 7. 회원 정보 조회 API
export const getMyProfile = async (): Promise<MyProfileResponse> => {
  const res = await api.get<MyProfileResponse>("/api/users/me/profile");
  return res.data;
};

// 8. 마케팅 푸시 동의 변경 API
export const updateMarketingPush = async (marketingPush: boolean) => {
  const res = await api.patch<{
    status: string;
    timestamp: string;
    data: string;
  }>("/api/users/me/marketing-push", {
    marketingPush,
  });

  return res.data;
};

// 9. 이메일 변경 API
export const updateEmail = async (email: string) => {
  const res = await api.patch<{
    status: string;
    timestamp: string;
    data: string;
  }>("/api/users/me/email", {
    email,
  });

  return res.data;
};

/** 전화번호 변경을 위한 인증번호 발송 API */
export const sendUpdatePhoneCode = async (phoneNumber: string) => {
  const res = await api.post("/api/users/me/phone/send-code", { phoneNumber });
  return res.data;
};

/** 전화번호 변경을 위한 인증번호 확인 API */
export const verifyUpdatePhoneCode = async (
  phoneNumber: string,
  code: string,
) => {
  const res = await api.post("/api/users/me/phone/verify-code", {
    phoneNumber,
    code,
  });
  return res.data;
};

// 기존 비밀번호 확인 API
export const verifyCurrentPassword = async (password: string) => {
  const res = await api.post<{
    status: string;
    timestamp: string;
    data: string;
  }>("/api/users/me/password/verify", {
    password,
  });
  return res.data;
};

// 비밀번호 변경 API (기존 비밀번호 없이)
export const changePassword = async (
  password: string,
  passwordConfirm: string,
) => {
  const res = await api.patch<{
    status: string;
    timestamp: string;
    data: string;
  }>("/api/users/me/password", {
    password,
    passwordConfirm,
  });
  return res.data;
};

// 비밀번호 변경용 전화번호 인증 발송
export const sendPasswordChangeCode = async (phoneNumber: string) => {
  const res = await api.post<{
    status: string;
    timestamp: string;
    data: string;
  }>("/api/users/me/password/send-code", {
    phoneNumber,
  });
  return res.data;
};

// 비밀번호 변경용 전화번호 인증 확인
export const verifyPasswordChangeCode = async (
  phoneNumber: string,
  code: string,
) => {
  const res = await api.post<{
    status: string;
    timestamp: string;
    data: string;
  }>("/api/users/me/password/verify-code", {
    phoneNumber,
    code,
  });
  return res.data;
};
