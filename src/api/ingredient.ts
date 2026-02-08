import api from "./axios";
import { CATEGORY_ID_TO_SERVER_KEY } from "../constants/category";

// --- 공통 타입 정의 ---
export type CategoryType =
  (typeof CATEGORY_ID_TO_SERVER_KEY)[keyof typeof CATEGORY_ID_TO_SERVER_KEY];
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

// --- [조회] 마스터 식재료 목록 관련 ---
export interface MasterIngredient {
  id: number;
  name: string;
  leftDays: number;
  imageUrl: string;
}

export interface IngredientCategory {
  category: string;
  displayName: string;
  ingredients: MasterIngredient[];
}

export interface MasterIngredientListResponse {
  categories: IngredientCategory[];
}

// --- [조회] 냉장고 홈 관련 ---
export interface HomeIngredient {
  type: IngredientType;
  referenceId: number;
  name: string;
  leftDays: number;
  imageUrl: string;
}

export interface RefrigeratorHomeResponse {
  fridge: HomeIngredient[];
  freezer: HomeIngredient[];
  pantry: HomeIngredient[];
}

// --- [등록] 관련 인터페이스 ---
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
  unit: string; // "개", "PIECE" 등 혼용 대응을 위해 string
  storage: string; // "냉장", "FRIDGE" 등 혼용 대응을 위해 string
  expirationDate: string;
  memo?: string;
} // --- [조회] 식재료 상세 관련 인터페이스 (수정됨) ---
export interface IngredientDetailResponse {
  ingredientId: number;
  name: string;
  storage: string; // 서버: "FRIDGE"
  expirationDate: string; // 서버: "2026-12-25"
  quantity: number;
  leftDays: number;
  memo: string;
  aiTip: string; // 🚀 tip 대신 aiTip으로 변경
  imageUrl: string;
}

/** [GET] 식재료 상세 정보 조회 */
export const getIngredientDetail = (ingredientId: number) => {
  // 응답 규격이 { status, timestamp, data } 이므로 timestamp 추가 가능 (선택사항)
  return api.get<{
    status: string;
    timestamp: string;
    data: IngredientDetailResponse;
  }>(`/api/users/me/refrigerator/${ingredientId}`);
};
// --- 매핑 사전 (내부용) ---
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

// --- [조회] 검색 결과 관련 인터페이스 ---
export interface SearchIngredientItem {
  ingredientId: number;
  name: string;
  imageUrl: string;
  expirationDate: string;
}

export interface IngredientSearchResponse {
  content: SearchIngredientItem[];
  page: number;
  size: number;
  hasNext: boolean;
}

// --- [삭제] 관련 인터페이스 ---
export interface DeleteIngredientsRequest {
  userIngredientsIds: number[];
}

export interface DeleteIngredientsResponse {
  success: boolean;
  message: string;
  deletedCount: number;
}

/** [DELETE] 내 식재료 삭제 (벌크) */
export const deleteIngredients = (data: DeleteIngredientsRequest) => {
  return api.delete<DeleteIngredientsResponse>("/api/users/me/ingredients", {
    data: data,
  });
};

/** [GET] 내 냉장고 식재료 검색 */
export const searchIngredients = (term: string, page: number = 0) => {
  return api.get<{ status: string; data: IngredientSearchResponse }>(
    `/api/users/me/ingredients/search`,
    {
      params: {
        name: term,
        page: page,
        size: 20,
      },
    },
  );
};
// --- API 함수 ---

/** [GET] 마스터 식재료 목록 조회 (AddItem 페이지용) */
export const getMasterIngredientList = () => {
  return api.get<{ status: string; data: MasterIngredientListResponse }>(
    "/api/users/me/ingredients/list",
  );
};

/** [POST] 식재료 냉장고 최종 추가 */
export const addIngredientToFridge = (data: AddIngredientRequest) => {
  // referenceId가 없는 경우를 대비한 방어 로직
  if (!data.referenceId) {
    console.error("에러: referenceId가 없습니다!", data);
  }

  const sanitizedData = {
    ...data,
    // referenceId가 문자열인 경우 숫자로 변환
    referenceId: Number(data.referenceId),
    storage: (STORAGE_MAP[data.storage] ||
      data.storage ||
      "FRIDGE") as StorageType,
    unit: (UNIT_MAP[data.unit] || data.unit || "PIECE") as UnitType,
    expirationDate: data.expirationDate.replace(/\./g, "-"),
  };

  return api.post("/api/users/me/ingredients", sanitizedData);
};

export const registerCustomIngredient = (data: CustomIngredientRequest) => {
  return api.post<{
    status: string;
    data: {
      customIngredientId: number;
      name: string;
      imageUrl: string;
      category: string;
    };
  }>("/api/users/me/ingredients/custom", data);
};

/** [GET] 냉장고 홈 데이터 조회 (보관 장소별 리스트) */
export const getRefrigeratorHome = () => {
  return api.get<{ status: string; data: RefrigeratorHomeResponse }>(
    "/api/users/me/refrigerator/home",
  );
};
