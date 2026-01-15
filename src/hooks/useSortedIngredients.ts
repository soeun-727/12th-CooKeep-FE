import { useIngredientStore } from "../stores/useIngredientStore";

export function useSortedIngredients() {
  const { ingredients, searchTerm, viewCategory, sortOrder } =
    useIngredientStore();

  // 검색 필터링
  const filteredIngredients = ingredients.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 카테고리 필터링 + 정렬
  const sortedIngredients = ingredients
    .filter((item) => item.category === viewCategory)
    .sort((a, b) => {
      if (sortOrder === "유통기한 임박 순") {
        const getDay = (exp: string) => {
          const num = parseInt(exp.replace(/[^0-9]/g, ""));
          return isNaN(num) ? 999 : num;
        };
        return getDay(a.expiration) - getDay(b.expiration);
      }
      return b.id - a.id; // 예시: 최신순
    });

  return { filteredIngredients, sortedIngredients };
}
