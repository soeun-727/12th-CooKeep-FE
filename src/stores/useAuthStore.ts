import { create } from "zustand";
import { saveTokens } from "../utils/auth";

// 1. 카카오 로그인 시 받는 데이터 구조 정의
interface KakaoLoginPayload {
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
  // 3. 카카오 로그인 액션 업데이트
  loginWithKakao: (payload: KakaoLoginPayload) => void;
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

    set({ isSubmitting: true });
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (phoneNumber === "01012341234" && password === "test1234") {
      set({ isSubmitting: false, isLoggedIn: true });
      const isFirstLogin = phoneNumber === "01012341234";
      return { success: true, isFirst: isFirstLogin };
    } else {
      set({ isSubmitting: false });
      alert("휴대폰 번호 또는 비밀번호가 일치하지 않습니다.");
      return { success: false, isFirst: false };
    }
  },

  // 4. 카카오 로그인 정보 저장 로직 강화
  loginWithKakao: (data) => {
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
    // 로그아웃 시 토큰 및 유저 정보 초기화
    set({
      isLoggedIn: false,
      userId: null,
      userStatus: null,
      nextStep: null,
    });
  },
}));
