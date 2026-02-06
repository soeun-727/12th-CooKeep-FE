import axios from "./axios"; // 네 axios 인스턴스

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
  const res = await axios.post<LoginResponse>("/api/auth/login", payload);

  // 우리가 필요한 건 data 안의 data
  return res.data.data;
};
