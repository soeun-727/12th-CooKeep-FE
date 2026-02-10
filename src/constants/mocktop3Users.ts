import appleStage4 from ".././assets/cookeeps/plant/apple/apple_stage_4.svg";
import tomatoStage4 from ".././assets/cookeeps/plant/tomato/tomato_stage_3.svg";
import lettuceStage4 from ".././assets/cookeeps/plant/lettuce/lettuce_stage_1.svg";

export interface User {
  id: number;
  nickname: string;
  plant_image: string;
  watering_count: number;
}

export const top3Users: User[] = [
  { id: 1, nickname: "요리왕", plant_image: appleStage4, watering_count: 15 },
  {
    id: 2,
    nickname: "쿠키수집가",
    plant_image: tomatoStage4,
    watering_count: 12,
  },
  {
    id: 3,
    nickname: "초보농부",
    plant_image: lettuceStage4,
    watering_count: 10,
  },
];
