// src/store/useSignupStore.ts
import { create } from "zustand";
import { sendSignupCodeApi, verifySignupCodeApi } from "../api/auth";

interface SignupState {
  phone: string;
  isCodeSent: boolean;
  isVerified: boolean;

  setPhone: (phone: string) => void;
  setIsVerified: (value: boolean) => void;
  sendCode: () => Promise<void>;
  verifyCode: (code: string) => Promise<boolean>;
  resetSignup: () => void;
}

export const useSignupStore = create<SignupState>((set, get) => ({
  phone: "",
  isCodeSent: false,
  isVerified: false,

  setPhone: (phone) =>
    set({
      phone,
      isVerified: false,
      isCodeSent: false,
    }),

  setIsVerified: (value: boolean) => set({ isVerified: value }),

  sendCode: async () => {
    const phone = get().phone;

    if (!phone) {
      throw new Error("전화번호가 없습니다.");
    }

    const normalizedPhone = phone.replace(/-/g, "");

    await sendSignupCodeApi(normalizedPhone);

    set({
      isCodeSent: true,
      isVerified: false,
    });
  },

  verifyCode: async (code: string) => {
    const phone = get().phone;
    const normalizedPhone = phone.replace(/-/g, "");

    try {
      await verifySignupCodeApi(normalizedPhone, code);
      set({ isVerified: true });
      return true;
    } catch {
      return false;
    }
  },

  resetSignup: () =>
    set({
      phone: "",
      isCodeSent: false,
      isVerified: false,
    }),
}));
