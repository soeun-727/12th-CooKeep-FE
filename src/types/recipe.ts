export interface Recipe {
  id: number;
  recipeName: string;
  tags: string[];
  ingredients: {
    name: string;
    isRequired: boolean;
  }[];
  substitutions?: {
    original: string;
    replacement: string;
  }[];
  steps: {
    order: number;
    description: string;
  }[];
  relatedVideos?: {
    title: string;
    thumbnail: string;
    url: string;
  }[];
}

// 요리 "내용"만 담당하는 타입
export interface RecipeContent {
  ingredients: {
    name: string;
    isRequired: boolean;
  }[];
  substitutions?: {
    original: string;
    replacement: string;
  }[];
  steps: {
    order: number;
    description: string;
  }[];
}
