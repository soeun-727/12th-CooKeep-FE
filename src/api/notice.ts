import api from "./axios";

export interface NoticeResponseItem {
  noticeId: number;
  title: string;
  content: string;
}

export interface NoticeApiResponse {
  status: string;
  timestamp: string;
  data: NoticeResponseItem[];
}

export const getNotices = async () => {
  const res = await api.get<NoticeApiResponse>("/api/notices");
  return res.data;
};
