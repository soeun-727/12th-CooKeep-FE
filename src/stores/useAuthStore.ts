import { create } from "zustand";

interface LoginResponse {
  success: boolean;
  isFirst: boolean;
}
interface AuthState {
  phoneNumber: string;
  password: string;
  isValidPhone: boolean; // 함수가 아닌 boolean 값으로 변경
  isValidPW: boolean;
  canLogin: boolean;
  isSubmitting: boolean;
  setPhoneNumber: (phone: string) => void;
  setPassword: (pw: string) => void;
  login: () => Promise<LoginResponse | null>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  phoneNumber: "",
  password: "",
  isValidPhone: false,
  isValidPW: false,
  canLogin: false,
  isSubmitting: false,

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
    const isValidPW = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(password);
    set((state) => ({
      password,
      isValidPW,
      // 비밀번호를 바꿀 때마다 로그인 가능 여부 업데이트
      canLogin: state.isValidPhone && isValidPW,
    }));
  },

  login: async () => {
    const { phoneNumber, password, canLogin } = get();
    if (!canLogin) return null;

    set({ isSubmitting: true });
    console.log("로그인 요청 중...");
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // 2. 임시 데이터 (Mock) 검증
    if (phoneNumber === "01012341234" && password === "test1234") {
      set({ isSubmitting: false });
      console.log("로그인 성공!");
      // alert("로그인에 성공했습니다!");
      // 여기에 페이지 이동 로직이나 전역 로그인 상태(isLoggedIn) 변경 추가

      // 임시로 '01012341234'인 경우만 최초 로그인(/onboarding)이라고 가정
      // 실제로는 서버에서 { isFirst: true } 같은 값을 내려주게 됩니다.
      const isFirstLogin = phoneNumber === "01012341234";

      return { success: true, isFirst: isFirstLogin };
    } else {
      set({ isSubmitting: false });
      console.error("로그인 실패: 정보 불일치");
      alert("휴대폰 번호 또는 비밀번호가 일치하지 않습니다.");
      return { success: false, isFirst: false };
    }
  },
}));
