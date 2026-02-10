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
  formData.append("image", file, file.name);
  const res = await api.post<ImageUploadResponse>(
    `/api/images?folder=RECIPE_IMAGES`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return res.data;
};
