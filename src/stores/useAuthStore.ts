import { create } from "zustand";

interface AuthState {
  phoneNumber: string;
  password: string;
  setPhoneNumber: (phone: string) => void;
  setPassword: (pw: string) => void;
  isValidPhone: () => boolean;
  isValidPW: () => boolean;
  canLogin: () => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  phoneNumber: "",
  password: "",
  //추후 구체적 로그인 로직 구현 시 수정 필요
  setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
  setPassword: (password) => set({ password }),

  isValidPhone: () => {
    const { phoneNumber } = get();
    return /^01[0-9]{8,9}$/.test(phoneNumber);
  },

  isValidPW: () => {
    const { password } = get();
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
  },

  canLogin: () => get().isValidPhone() && get().isValidPW(),
}));
