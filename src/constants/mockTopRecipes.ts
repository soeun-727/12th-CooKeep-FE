// src/constants/mockTopRecipes.ts
export interface Recipe {
  id: string;
  title: string;
  likes: number;
  image: string;
}

export const topRecipes: Recipe[] = [
  {
    id: "3",
    title: "블루베리 비빔밥",
    likes: 100,
    // 보울에 담긴 신선한 베리와 곡물 이미지 (상업적 이용 가능)
    image:
      "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "고추장 마요 달걀밥",
    likes: 79,
    // 정갈한 계란 덮밥 느낌의 이미지 (상업적 이용 가능)
    image:
      "https://images.unsplash.com/photo-1511910849309-0dffb8785146?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "1",
    title: "밤 티라미수",
    likes: 68,
    // 고급스러운 디저트/티라미수 이미지 (상업적 이용 가능)
    image:
      "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=200&auto=format&fit=crop",
  },
];
