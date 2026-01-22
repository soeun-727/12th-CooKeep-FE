import { useIngredientStore } from "../stores/useIngredientStore";

export function useSortedIngredients() {
  const { ingredients, searchTerm, viewCategory, sortOrder } =
    useIngredientStore();

  // 검색 필터링
  const filteredIngredients = ingredients.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // 카테고리 필터 (null = 전체보기)
  const categoryFiltered =
    viewCategory === null
      ? filteredIngredients
      : filteredIngredients.filter((item) => item.category === viewCategory);

  // 정렬
  const sortedIngredients = [...categoryFiltered].sort((a, b) => {
    if (sortOrder === "유통기한 임박 순") {
      return a.dDay - b.dDay; // 핵심
    }

    if (sortOrder === "등록 오래된 순") {
      return a.id - b.id;
    }

    return b.id - a.id; // 등록 최신 순
  });

  return { filteredIngredients, sortedIngredients };
}
