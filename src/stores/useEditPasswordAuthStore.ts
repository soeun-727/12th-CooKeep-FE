// src/stores/useEditPasswordAuthStore.ts
import { create } from "zustand";

interface EditPasswordAuthState {
  phone: string;
  isCodeSent: boolean;

  setPhone: (phone: string) => void;
  sendCode: () => Promise<void>;
  verifyCode: (code: string) => Promise<boolean>;
  reset: () => void;
}

export const useEditPasswordAuthStore = create<EditPasswordAuthState>(
  (set, get) => ({
    phone: "",
    isCodeSent: false,

    setPhone: (phone) => set({ phone }),

    sendCode: async () => {
      // TODO: 실제 인증번호 발송 API로 교체
      console.log("📨 인증번호 발송:", get().phone);

      await new Promise((res) => setTimeout(res, 500));
      set({ isCodeSent: true });
    },

    verifyCode: async (code: string) => {
      // TODO: 실제 인증번호 검증 API로 교체
      console.log("인증번호 확인:", code);

      await new Promise((res) => setTimeout(res, 500));

      // 테스트용: 123456만 성공
      return code === "123456";
    },

    reset: () =>
      set({
        phone: "",
        isCodeSent: false,
      }),
  }),
);
