import api from "../api/axios";

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
