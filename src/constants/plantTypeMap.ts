// constants/plantTypeMap.ts
import type { PlantType } from "../stores/useCookeepsStore";

/** UI 선택 (id → type) */
export const PLANT_ID_TO_TYPE: Record<number, PlantType> = {
  1: "beans",
  2: "potato",
  3: "apple",
  4: "lettuce",
  5: "tomato",
  6: "strawberry",
};

/** 서버 응답 (이름 → type) */
export const PLANT_NAME_TO_TYPE: Record<string, PlantType> = {
  감자: "potato",
  토마토: "tomato",
  상추: "lettuce",
  딸기: "strawberry",
  사과: "apple",
  콩: "beans",
};
