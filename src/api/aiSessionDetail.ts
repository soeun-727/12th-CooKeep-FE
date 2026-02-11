import api from "./axios";

export interface AiSessionMessage {
  role: "AI" | "USER";
  messageType: string;
  content: string;
  createdAt: string;
}

export interface AiSessionDetailResponse {
  status: string;
  timestamp: string;
  data: {
    sessionId: number;
    messages: AiSessionMessage[];
  };
}

export const getAiSessionDetail = async (sessionId: number) => {
  const res = await api.get<AiSessionDetailResponse>(
    `/api/users/me/ai/recipes/sessions/${sessionId}`,
  );

  return res.data.data;
};
