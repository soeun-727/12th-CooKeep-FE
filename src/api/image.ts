import api from "./axios";

export interface ImageUploadResponse {
  status: string;
  timestamp: string;
  data: {
    imageUrl: string;
  };
}

export const uploadImage = async (file: File): Promise<ImageUploadResponse> => {
  const formData = new FormData();

  // 1. Body에는 'image' 하나만 넣습니다. (콘솔 확인 결과 잘 되고 있음)
  formData.append("image", file, file.name);

  // 2. folder는 URL 파라미터로 명시합니다.
  // params 설정을 쓰거나, 아래처럼 주소 뒤에 직접 적어주세요.
  const res = await api.post<ImageUploadResponse>(
    "/api/images?folder=recipeImages", // 🚀 핵심: URL에 직접 붙임
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return res.data;
};
