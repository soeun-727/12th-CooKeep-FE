// src/types/record.ts
import type { RecipeContent } from "./recipe";

export interface RecordPayload {
  recipeId: number;
  title: string;
  memo?: string;
  isPublic: boolean;
  images?: File[];
}

export interface CookeepRecord {
  id: string;
  recipeId: number;
  recipeTitle: string;
  memo: string;
  images: File[]; // 대표 이미지
  createdAt: string; // "2026.02.02"
  isPublic: boolean;
  recipeContent: RecipeContent;
  tags?: string[];
  relatedVideos?: {
    title: string;
    thumbnail: string;
    url: string;
  }[];
}
