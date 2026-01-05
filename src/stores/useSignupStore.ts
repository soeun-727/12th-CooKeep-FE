// src/store/useSignupStore.ts
import { create } from "zustand";

interface SignupState {
  phone: string;
  isCodeSent: boolean;
  isVerified: boolean;

  setPhone: (phone: string) => void;
  setIsVerified: (value: boolean) => void;
  sendCode: () => void;
  verifyCode: (code: string) => Promise<boolean>;
  resetSignup: () => void;
}

export const useSignupStore = create<SignupState>((set) => ({
  phone: "",
  isCodeSent: false,
  isVerified: false,

  setPhone: (phone) => set({ phone }),
  setIsVerified: (value: boolean) => set({ isVerified: value }),

  sendCode: () =>
    set({
      isCodeSent: true,
      isVerified: false,
    }),

  verifyCode: async (code: string, options?: { setVerified?: boolean }) => {
    const success = code === "123456"; // mock
    if (success && options?.setVerified) {
      set({ isVerified: true });
    }
    return success;
  },

  resetSignup: () =>
    set({
      phone: "",
      isCodeSent: false,
      isVerified: false,
    }),
}));
