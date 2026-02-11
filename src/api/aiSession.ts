import api from "./axios";

export interface AiRecipeSessionItem {
  sessionId: number;
  title: string;
  createdAt: string;
  isPinned: boolean;
}

export interface AiRecipeSessionListResponse {
  status: string;
  timestamp: string;
  data: {
    pinned: AiRecipeSessionItem[];
    sessions: AiRecipeSessionItem[];
  };
}

export const getAiRecipeSessions = async () => {
  const res = await api.get<AiRecipeSessionListResponse>(
    "/api/users/me/ai/recipes/sessions",
  );

  return res.data.data;
};
