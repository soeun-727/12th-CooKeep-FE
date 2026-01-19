// src/stores/useFindPasswordStore.ts
import { create } from "zustand";

interface FindPasswordState {
  phone: string;
  isCodeSent: boolean;
  isVerified: boolean;

  setPhone: (phone: string) => void;
  sendCode: () => Promise<void>;
  verifyCode: (code: string) => Promise<boolean>;
  reset: () => void;
}

export const useFindPasswordStore = create<FindPasswordState>((set) => ({
  phone: "",
  isCodeSent: false,
  isVerified: false,

  setPhone: (phone) => set({ phone }),

  sendCode: async () => {
    // TODO 실제 API 연결
    set({ isCodeSent: true });
  },

  verifyCode: async (code) => {
    // TODO 실제 API 연결
    const success = code === "123456"; // mock
    if (success) {
      set({ isVerified: true });
    }
    return success;
  },

  reset: () =>
    set({
      phone: "",
      isCodeSent: false,
      isVerified: false,
    }),
}));
