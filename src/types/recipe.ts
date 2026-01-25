export interface Recipe {
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
