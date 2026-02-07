import axios from "axios";
import { getAccessToken, clearTokens } from "../utils/auth";
import { refreshAccessToken } from "../api/auth.api";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 10000,
});

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token && config.headers) {
    const hasBearer = token.startsWith("Bearer ");
    config.headers.Authorization = hasBearer ? token : `Bearer ${token}`;
  }
  return config;
});
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const isUnauthorized =
      error.response?.status === 401 ||
      error.response?.data?.code === "AUTH-001";

    if (isUnauthorized && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        console.log("인증 실패 감지: 토큰 갱신을 시도합니다.");
        const newAccessToken = await refreshAccessToken();

        if (originalRequest.headers) {
          const hasBearer = newAccessToken.startsWith("Bearer ");
          originalRequest.headers.Authorization = hasBearer
            ? newAccessToken
            : `Bearer ${newAccessToken}`;
        }

        return api(originalRequest);
      } catch (refreshError) {
        console.error("세션이 만료되었습니다. 다시 로그인해주세요.");
        clearTokens();
        if (!window.location.pathname.includes("/login")) {
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default api;
