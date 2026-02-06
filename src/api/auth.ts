import api from "./axios";

// 로그인 부분
interface LoginRequest {
  phoneNumber: string;
  password: string;
}

interface LoginResponse {
  status: string;
  timestamp: string;
  data: {
    userId: number;
    accessToken: string;
    refreshToken: string;
    userStatus: "CREATED" | "ACTIVE";
  };
}

export const loginApi = async (payload: LoginRequest) => {
  const res = await api.post<LoginResponse>("/api/auth/login", payload);

  // 우리가 필요한 건 data 안의 data
  return res.data.data;
};

// 회원가입부분
export interface SignupRequest {
  phoneNumber: string;
  email: string;
  password: string;
  passwordConfirm: string;
  marketingConsent: boolean;
}

export const signup = async (payload: SignupRequest) => {
  const res = await api.post("/api/auth/signup", payload);
  return res.data;
};
