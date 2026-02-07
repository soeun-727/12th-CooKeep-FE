import api from "./axios";
import { CATEGORY_ID_MAP } from "../constants/category";

// --- 공통 타입 정의 ---
export type CategoryType =
  (typeof CATEGORY_ID_MAP)[keyof typeof CATEGORY_ID_MAP];
export type StorageType = "FRIDGE" | "FREEZER" | "PANTRY";
export type IngredientType = "DEFAULT" | "CUSTOM";
export type UnitType =
  | "PIECE"
  | "PACK"
  | "BAG"
  | "BOTTLE"
  | "BUNDLE"
  | "CAN"
  | "GRAM"
  | "MILLILITER";

// --- 조회 관련 인터페이스 (추가) ---
export interface RefrigeratorItem {
  type: IngredientType;
  referenceId: number;
  name: string;
  leftDays: number;
  imageUrl: string;
}

export interface RefrigeratorResponse {
  fridge: RefrigeratorItem[];
  freezer: RefrigeratorItem[];
  pantry: RefrigeratorItem[];
}

// --- 등록 관련 인터페이스 ---
export interface CustomIngredientRequest {
  name: string;
  expirationDays: number;
  storage: StorageType;
  category: CategoryType;
}

export interface AddIngredientRequest {
  type: IngredientType;
  referenceId: number;
  quantity: number;
  unit: string;
  storage: string;
  expirationDate: string;
  memo?: string;
}

// --- 매핑 사전 ---
const STORAGE_MAP: Record<string, StorageType> = {
  냉장: "FRIDGE",
  냉동: "FREEZER",
  상온: "PANTRY",
  FRIDGE: "FRIDGE",
  FREEZER: "FREEZER",
  PANTRY: "PANTRY",
};

const UNIT_MAP: Record<string, UnitType> = {
  개: "PIECE",
  팩: "PACK",
  봉지: "BAG",
  병: "BOTTLE",
  묶음: "BUNDLE",
  캔: "CAN",
  g: "GRAM",
  ml: "MILLILITER",
  PIECE: "PIECE",
  PACK: "PACK",
  BAG: "BAG",
  BOTTLE: "BOTTLE",
  BUNDLE: "BUNDLE",
  CAN: "CAN",
  GRAM: "GRAM",
  MILLILITER: "MILLILITER",
};

// --- API 함수 ---

/** [GET] 냉장고 전체 식재료 조회 (추가) */
export const getRefrigeratorHome = () => {
  return api.get<RefrigeratorResponse>("/api/users/me/refrigerator/home");
};

/** [POST] 일반 식재료 냉장고 추가 */
export const addIngredientToFridge = (data: AddIngredientRequest) => {
  const sanitizedData = {
    ...data,
    referenceId: Number(data.referenceId),
    storage: (STORAGE_MAP[data.storage] ||
      data.storage ||
      "FRIDGE") as StorageType,
    unit: (UNIT_MAP[data.unit] || data.unit || "PIECE") as UnitType,
    expirationDate: data.expirationDate.replace(/\./g, "-"),
  };

  return api.post("/api/users/me/ingredients", sanitizedData);
};

/** [POST] 커스텀 식재료 시스템 등록 */
export const registerCustomIngredient = (data: CustomIngredientRequest) => {
  return api.post("/api/users/me/ingredients/custom", data);
};
