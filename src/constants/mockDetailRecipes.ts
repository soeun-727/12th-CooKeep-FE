export interface RecipeDetail {
  id: string;
  recipeName: string;
  tags: string[];

  user: {
    id: string;
    name: string;
    profileImage?: string;
  };

  ingredients: { name: string; isRequired: boolean }[];
  substitutions?: { original: string; replacement: string }[];
  steps: { order: number; description: string }[];
  relatedVideos?: { title: string; thumbnail: string; url: string }[];

  memo?: string; // 유저 한줄평
  userImages?: string[]; // 유저가 찍은 사진
}

export const MOCK_DETAIL_RECIPES: RecipeDetail[] = [
  {
    id: "2",
    recipeName: "고추장 마요 달걀밥",
    tags: ["고추장", "달걀밥", "마요네즈"],

    user: {
      id: "u1",
      name: "요리왕",
    },
    ingredients: [
      { name: "마요네즈", isRequired: true },
      { name: "달걀", isRequired: true },
      { name: "고추장", isRequired: true },
      { name: "버터", isRequired: false },
      { name: "밥", isRequired: true },
      { name: "파", isRequired: false },
    ],
    substitutions: [
      { original: "파", replacement: "양파로 대체 가능하거나 생략 가능" },
      { original: "버터", replacement: "식용유 또는 참기름 소량" },
    ],
    steps: [
      { order: 1, description: "뜨거운 밥 위에 버터를 녹인다." },
      { order: 2, description: "달걀 프라이를 반숙으로 굽는다." },
      { order: 3, description: "고추장과 마요네즈를 넣고 비빈다." },
    ],
    relatedVideos: [
      {
        title: "초간단 고추장 마요 달걀밥",
        thumbnail: "https://img.youtube.com/vi/aaa/0.jpg",
        url: "https://www.youtube.com/watch?v=aaa",
      },
      {
        title: "자취생 필수 달걀밥 레시피",
        thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg",
        url: "https://www.youtube.com/watch?v=bbb",
      },
      {
        title: "건강한 블루베리 비빔밥",
        thumbnail: "https://img.youtube.com/vi/ddd/0.jpg",
        url: "https://www.youtube.com/watch?v=ddd",
      },
    ],
    memo: "간단하지만 너무 맛있어요! 점심에 딱.",
    userImages: [
      "https://images.unsplash.com/photo-1511910849309-0dffb8785146?q=80&w=200&auto=format&fit=crop",
    ],
  },

  {
    id: "1",
    recipeName: "우유 계란찜",
    tags: ["우유", "달걀", "부드러운"],
    user: {
      id: "u1",
      name: "쿠키수집가",
    },
    ingredients: [
      { name: "달걀", isRequired: true },
      { name: "우유", isRequired: true },
      { name: "소금", isRequired: true },
    ],
    steps: [
      { order: 1, description: "달걀을 풀고 우유를 섞는다." },
      { order: 2, description: "소금으로 간을 한다." },
      { order: 3, description: "약불에서 천천히 찐다." },
    ],
    memo: "부드럽고 촉촉해서 아이들이 좋아해요.",
  },

  {
    id: "3",
    recipeName: "블루베리 비빔밥",
    tags: ["블루베리", "비빔밥", "건강식"],
    user: {
      id: "u1",
      name: "초보농부",
    },
    ingredients: [
      { name: "블루베리", isRequired: true },
      { name: "밥", isRequired: true },
      { name: "견과류", isRequired: false },
      { name: "꿀", isRequired: false },
    ],
    steps: [
      { order: 1, description: "밥 위에 블루베리를 올린다." },
      { order: 2, description: "견과류와 꿀을 뿌린다." },
      { order: 3, description: "잘 비벼서 완성한다." },
    ],
    relatedVideos: [
      {
        title: "건강한 블루베리 비빔밥",
        thumbnail: "https://img.youtube.com/vi/ddd/0.jpg",
        url: "https://www.youtube.com/watch?v=ddd",
      },
    ],
    memo: "달콤하고 건강한 한 끼!",
    userImages: [
      "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?q=80&w=200&auto=format&fit=crop",
    ],
  },
];
