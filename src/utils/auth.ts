// src/utils/auth.ts (수정 가안)
import Cookies from "js-cookie"; // js-cookie 라이브러리 설치 필요

export function saveTokens(params: {
  accessToken: string;
  refreshToken: string;
}) {
  // 로컬 스토리지 대신 쿠키에 저장
  // secure: true는 HTTPS에서만 전송, sameSite: 'strict'는 CSRF 방지
  Cookies.set("accessToken", params.accessToken, {
    expires: 1 / 24,
    secure: true,
    sameSite: "strict",
  });
  Cookies.set("refreshToken", params.refreshToken, {
    expires: 7,
    secure: true,
    sameSite: "strict",
  });
}

export function getRefreshToken() {
  return Cookies.get("refreshToken");
}

export function getAccessToken() {
  return Cookies.get("accessToken");
}

export function clearTokens() {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
}
