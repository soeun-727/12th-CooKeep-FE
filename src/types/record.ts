export interface RecordPayload {
  recipeId: number;
  title: string;
  memo?: string;
  isPublic: boolean;
  images?: File[];
}
