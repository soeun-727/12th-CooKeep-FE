import { useEffect, useMemo, useState } from "react";
import Search from "../features/Search";
import Sort from "../features/Sort";
import Storage from "./Storage";
import IngredientGrid from "../items/IngredientGrid";
import NoResultView from "../items/NoResultView";
import ItemOption from "../items/ItemOption";

import fridgeIcon from "../../../assets/fridge/fridge.svg";
import freezerIcon from "../../../assets/fridge/freezer.svg";
import pantryIcon from "../../../assets/fridge/pantry.svg";
import milk from "../../../assets/fridge/milk.svg";

import { useIngredientStore } from "../../../stores/useIngredientStore";
import { useSortedIngredients } from "../../../hooks/useSortedIngredients"; // 커스텀 훅 임포트
import ExpiryAlertModal from "../modals/ExpiryAlertModal";
import IngredientDetailModal from "../modals/IngredientDetailModal";

const TEMP_DATA = [
  {
    id: 1,
    name: "우유",
    expiration: "D-3",
    image: milk,
    category: "냉장",
    tip: "우유는 냉장고 안쪽 깊숙이 보관하는 것이 가장 좋아요!",
  }, // 임시tip추가
  { id: 2, name: "냉동우유", expiration: "D-1", image: milk, category: "냉동" },
  {
    id: 3,
    name: "오래된우유",
    expiration: "D-45",
    image: milk,
    category: "냉동",
  },
  { id: 4, name: "우유", expiration: "D-1", image: milk, category: "냉장" },
  { id: 5, name: "우유", expiration: "D-2", image: milk, category: "냉장" },
  { id: 6, name: "우유", expiration: "D-3", image: milk, category: "냉장" },
  { id: 7, name: "우유", expiration: "D-4", image: milk, category: "냉장" },
  { id: 8, name: "우유", expiration: "D-9", image: milk, category: "냉장" },
  { id: 9, name: "우유", expiration: "D-7", image: milk, category: "냉장" },
  {
    id: 10,
    name: "이름이정말로긴우유",
    expiration: "D-7",
    image: milk,
    category: "냉동",
  },
  {
    id: 11,
    name: "딸기우유",
    expiration: "D-7",
    image: milk,
    category: "냉장",
  },
  {
    id: 12,
    name: "바나나우유",
    expiration: "D-7",
    image: milk,
    category: "냉장",
  },
  {
    id: 13,
    name: "초코우유",
    expiration: "D-7",
    image: milk,
    category: "냉장",
  },
  {
    id: 14,
    name: "두바이초코우유",
    expiration: "D-7",
    image: milk,
    category: "냉장",
  },
];

export default function FridgeTab() {
  const { ingredients, setIngredients, searchTerm, viewCategory } =
    useIngredientStore();
  const { filteredIngredients, sortedIngredients } = useSortedIngredients();

  useEffect(() => {
    if (ingredients.length === 0) setIngredients(TEMP_DATA as any);
  }, [ingredients.length, setIngredients]);

  // parsing func--------------------------
  // const parseDDay = (exp: string) => {
  //   if (!exp.startsWith("D-")) return Infinity;
  //   const num = Number(exp.replace("D-", ""));
  //   return isNaN(num) ? Infinity : num;
  // };

  // const expiringIngredients = useMemo(
  //   () =>
  //     ingredients.filter((i) => {
  //       const daysLeft = parseDDay(i.expiration);
  //       return daysLeft <= 3 && daysLeft >= 0;
  //     }),
  //   [ingredients],
  // );

  // 재료 여러개 가능일때 & 오늘
  // const todayIngredients = useMemo(
  //   () => ingredients.filter((i) => i.expiration === "D-0"),
  //   [ingredients],
  // );
  const todayIngredients = useMemo(() => {
    const list = ingredients.filter((i) => i.expiration === "D-0");
    return list.length > 0 ? [list[0]] : [];
  }, [ingredients]);

  const [isExpiryModalOpen, setIsExpiryModalOpen] = useState(() => {
    const source = ingredients.length > 0 ? ingredients : TEMP_DATA;
    return source.some((i) => {
      if (!i.expiration.startsWith("D-")) return false;
      const d = Number(i.expiration.replace("D-", ""));
      return d <= 3 && d >= 0;
    });
  });

  //---------------------------------------
  // 상세정보 부분 추가
  const { selectedIngredient, closeDetail } = useIngredientStore();
  //---------------------------

  // 카테고리에 따른 아이콘 반환 함수
  const getCategoryIcon = (category: string | null) => {
    switch (category) {
      case "냉장":
        return fridgeIcon;
      case "냉동":
        return freezerIcon;
      case "상온":
        return pantryIcon;
      default:
        return fridgeIcon;
    }
  };

  const isSearching = searchTerm.trim().length > 0;
  const isListView = !!viewCategory && !isSearching;

  return (
    <div className="w-full flex flex-col transition-all">
      <Search />

      {/* 모달 */}
      <ExpiryAlertModal
        isOpen={isExpiryModalOpen}
        onClose={() => setIsExpiryModalOpen(false)}
        items={todayIngredients}
      />

      {/* 1. 검색 모드 */}
      {isSearching &&
        (filteredIngredients.length > 0 ? (
          <IngredientGrid items={filteredIngredients} />
        ) : (
          <NoResultView />
        ))}

      {/* 2. 카테고리 리스트 모드 (전체보기) */}
      {isListView && (
        <>
          <Sort
            categoryIcon={getCategoryIcon(viewCategory)}
            viewCategory={viewCategory!}
          />
          <IngredientGrid items={sortedIngredients} />
        </>
      )}

      {/* 3. 기본 메인 화면 (카테고리별 요약) */}
      {!isSearching && !viewCategory && (
        <div className="flex flex-col gap-[10px]">
          <Storage
            category="냉장"
            image={fridgeIcon}
            ingredients={ingredients.filter((i) => i.category === "냉장")}
          />
          <Storage
            category="냉동"
            image={freezerIcon}
            ingredients={ingredients.filter((i) => i.category === "냉동")}
          />
          <Storage
            category="상온"
            image={pantryIcon}
            ingredients={ingredients.filter((i) => i.category === "상온")}
          />
        </div>
      )}

      <ItemOption />

      {selectedIngredient && (
        <IngredientDetailModal
          ingredient={selectedIngredient}
          onClose={closeDetail}
        />
      )}
    </div>
  );
}
