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
        const newAccessToken = await refreshAccessToken();

        if (originalRequest.headers) {
          const hasBearer = newAccessToken.startsWith("Bearer ");
          originalRequest.headers.Authorization = hasBearer
            ? newAccessToken
            : `Bearer ${newAccessToken}`;
        }

        if (originalRequest.data && typeof originalRequest.data === "string") {
          try {
            originalRequest.data = JSON.parse(originalRequest.data);
          } catch (e) {
            // parsing error fallback
          }
        }

        return api(originalRequest);
      } catch (refreshError) {
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
