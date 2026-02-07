// src/api/ingredient.ts
import api from "./axios";
import { CATEGORY_ID_MAP } from "../constants/category";

export type CategoryType =
  (typeof CATEGORY_ID_MAP)[keyof typeof CATEGORY_ID_MAP];
export type StorageType = "FRIDGE" | "FREEZER" | "PANTRY";

export interface CustomIngredientRequest {
  name: string;
  expirationDays: number;
  storage: StorageType;
  category: CategoryType;
}

export interface CustomIngredientResponse {
  customIngredientId: number;
  name: string;
  expirationDays: number;
  storage: StorageType;
  category: CategoryType;
}

export const registerCustomIngredient = (data: CustomIngredientRequest) => {
  return api.post<CustomIngredientResponse>(
    "/api/users/me/ingredients/custom",
    data,
  );
};
