import api from "./axios";

export interface PushEligibilityResponse {
  eligible: boolean;
}

/** [POST] 푸시 알림 자격 확인 (마케팅 동의 및 유통기한 임박 식재료 여부) */
export const checkPushEligibility =
  async (): Promise<PushEligibilityResponse> => {
    const res = await api.post<PushEligibilityResponse>(
      "/api/users/me/push/eligibility",
    );
    return res.data;
  };
