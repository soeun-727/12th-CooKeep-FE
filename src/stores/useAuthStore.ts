import { create } from "zustand";
import { saveTokens } from "../utils/auth";
import { loginApi } from "../api/auth";
import axios from "axios";
import { clearTokens } from "../utils/auth";

// 1. 소셜 로그인 시 받는 데이터 구조 정의
interface SocialLoginPayload {
  userId: number;
  accessToken: string;
  refreshToken: string;
  nextStep: "TERMS" | "ONBOARDING" | "HOME" | string; // 백엔드 값에 따라 유연하게 처리
  userStatus: string; // "ACTIVE", "BLOCKED" 등 백엔드에서 주는 값
}

interface LoginResponse {
  success: boolean;
  isFirst: boolean;
}

interface AuthState {
  phoneNumber: string;
  password: string;
  isValidPhone: boolean;
  isValidPW: boolean;
  canLogin: boolean;
  isSubmitting: boolean;
  isLoggedIn: boolean;

  // 2. 추가된 유저 정보 상태
  userId: number | null;
  userStatus: string | null;
  nextStep: string | null;

  setPhoneNumber: (phone: string) => void;
  setPassword: (pw: string) => void;
  login: () => Promise<LoginResponse | null>;
  // 3. 소셜 로그인 액션 업데이트
  loginSocial: (payload: SocialLoginPayload) => void;
  logout: () => void; // 로그아웃 기능도 있으면 좋아요!
}

export const useAuthStore = create<AuthState>((set, get) => ({
  phoneNumber: "",
  password: "",
  isValidPhone: false,
  isValidPW: false,
  canLogin: false,
  isSubmitting: false,
  isLoggedIn: false,
  userId: null,
  userStatus: null,
  nextStep: null,

  setPhoneNumber: (phoneNumber) => {
    const isValidPhone = /^01[0-9]{8,9}$/.test(phoneNumber);
    set((state) => ({
      phoneNumber,
      isValidPhone,
      canLogin: isValidPhone && state.isValidPW,
    }));
  },

  setPassword: (password) => {
    const isValidPW = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(password);
    set((state) => ({
      password,
      isValidPW,
      canLogin: state.isValidPhone && isValidPW,
    }));
  },

  login: async () => {
    const { phoneNumber, password, canLogin } = get();
    if (!canLogin) return null;

    try {
      set({ isSubmitting: true });

      const data = await loginApi({
        phoneNumber,
        password,
      });

      // 토큰 저장
      saveTokens({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });

      set({
        isLoggedIn: true,
        userId: data.userId,
        userStatus: data.userStatus,
        isSubmitting: false,
      });

      return {
        success: true,
        isFirst: data.userStatus === "CREATED",
      };
    } catch (err) {
      set({ isSubmitting: false });

      if (axios.isAxiosError(err)) {
        const code = err.response?.data?.code;

        if (code === "AUTH-004") {
          alert("가입되지 않은 전화번호입니다.");
        } else if (code === "AUTH-003") {
          alert("비밀번호가 올바르지 않습니다.");
        } else {
          alert("로그인 중 오류가 발생했습니다.");
        }
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
      }

      return { success: false, isFirst: false };
    }
  },

  // 4. 소셜 로그인 정보 저장 로직 강화
  loginSocial: (data) => {
    saveTokens({
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    });

    set({
      isLoggedIn: true,
      userId: data.userId,
      userStatus: data.userStatus, // 상태 저장
      nextStep: data.nextStep, // 단계 저장
    });
  },

  logout: () => {
    clearTokens(); // 추가해야한다고 해서 추가했습니다.
    // 로그아웃 시 토큰 및 유저 정보 초기화
    set({
      isLoggedIn: false,
      userId: null,
      userStatus: null,
      nextStep: null,
    });
  },
}));
