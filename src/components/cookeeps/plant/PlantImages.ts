// src/components/cookeeps/plant/plantImages.ts
import type { PlantType } from "../../../stores/useCookeepsStore";

import emptyPlant from "../../../assets/cookeeps/plant/plant_before.svg";
import apple1 from "../../../assets/cookeeps/plant/apple/apple_stage_1.svg";
import apple2 from "../../../assets/cookeeps/plant/apple/apple_stage_2.svg";
import apple3 from "../../../assets/cookeeps/plant/apple/apple_stage_3.svg";
import apple4 from "../../../assets/cookeeps/plant/apple/apple_stage_4.svg";

import beans1 from "../../../assets/cookeeps/plant/beans/beans_stage_1.svg";
import beans2 from "../../../assets/cookeeps/plant/beans/beans_stage_2.svg";
import beans3 from "../../../assets/cookeeps/plant/beans/beans_stage_3.svg";
import beans4 from "../../../assets/cookeeps/plant/beans/beans_stage_4.svg";

import lettuce1 from "../../../assets/cookeeps/plant/lettuce/lettuce_stage_1.svg";
import lettuce2 from "../../../assets/cookeeps/plant/lettuce/lettuce_stage_2.svg";
import lettuce3 from "../../../assets/cookeeps/plant/lettuce/lettuce_stage_3.svg";
import lettuce4 from "../../../assets/cookeeps/plant/lettuce/lettuce_stage_4.svg";

import tomato1 from "../../../assets/cookeeps/plant/tomato/tomato_stage_1.svg";
import tomato2 from "../../../assets/cookeeps/plant/tomato/tomato_stage_2.svg";
import tomato3 from "../../../assets/cookeeps/plant/tomato/tomato_stage_3.svg";
import tomato4 from "../../../assets/cookeeps/plant/tomato/tomato_stage_4.svg";

import potato1 from "../../../assets/cookeeps/plant/potato/potato_stage_1.svg";
import potato2 from "../../../assets/cookeeps/plant/potato/potato_stage_2.svg";
import potato3 from "../../../assets/cookeeps/plant/potato/potato_stage_3.svg";
import potato4 from "../../../assets/cookeeps/plant/potato/potato_stage_4.svg";

import strawberry1 from "../../../assets/cookeeps/plant/strawberry/strawberry_stage_1.svg";
import strawberry2 from "../../../assets/cookeeps/plant/strawberry/strawberry_stage_2.svg";
import strawberry3 from "../../../assets/cookeeps/plant/strawberry/strawberry_stage_3.svg";
import strawberry4 from "../../../assets/cookeeps/plant/strawberry/strawberry_stage_4.svg";

export type PlantStage = 1 | 2 | 3 | 4;

/** 선택 전 이미지 */
export const EMPTY_PLANT_IMAGE = emptyPlant;

/** 선택 후 성장 이미지 */
export const PLANT_IMAGES: Record<PlantType, Record<PlantStage, string>> = {
  apple: {
    1: apple1,
    2: apple2,
    3: apple3,
    4: apple4,
  },
  beans: {
    1: beans1,
    2: beans2,
    3: beans3,
    4: beans4,
  },
  lettuce: {
    1: lettuce1,
    2: lettuce2,
    3: lettuce3,
    4: lettuce4,
  },
  tomato: {
    1: tomato1,
    2: tomato2,
    3: tomato3,
    4: tomato4,
  },
  potato: {
    1: potato1,
    2: potato2,
    3: potato3,
    4: potato4,
  },
  strawberry: {
    1: strawberry1,
    2: strawberry2,
    3: strawberry3,
    4: strawberry4,
  },
};
