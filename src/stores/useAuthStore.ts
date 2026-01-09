import { create } from "zustand";

interface AuthState {
  phoneNumber: string;
  password: string;
  isValidPhone: boolean; // 함수가 아닌 boolean 값으로 변경
  isValidPW: boolean;
  canLogin: boolean;
  setPhoneNumber: (phone: string) => void;
  setPassword: (pw: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  phoneNumber: "",
  password: "",
  isValidPhone: false,
  isValidPW: false,
  canLogin: false,

  setPhoneNumber: (phoneNumber) => {
    const isValidPhone = /^01[0-9]{8,9}$/.test(phoneNumber);
    set((state) => ({
      phoneNumber,
      isValidPhone,
      // 폰 번호를 바꿀 때마다 로그인 가능 여부 업데이트
      canLogin: isValidPhone && state.isValidPW,
    }));
  },

  setPassword: (password) => {
    const isValidPW = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
    set((state) => ({
      password,
      isValidPW,
      // 비밀번호를 바꿀 때마다 로그인 가능 여부 업데이트
      canLogin: state.isValidPhone && isValidPW,
    }));
  },
}));
