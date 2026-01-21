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
import { TEMP_DATA } from "../../../constants/tempIngredients";

import { useIngredientStore } from "../../../stores/useIngredientStore";
import { useSortedIngredients } from "../../../hooks/useSortedIngredients"; // 커스텀 훅 임포트
import ExpiryAlertModal from "../modals/ExpiryAlertModal";
import IngredientDetailModal from "../modals/IngredientDetailModal";

export default function FridgeTab() {
  const { ingredients, setIngredients, searchTerm, viewCategory } =
    useIngredientStore();
  const { filteredIngredients, sortedIngredients } = useSortedIngredients();

  useEffect(() => {
    if (ingredients.length === 0) setIngredients(TEMP_DATA);
  }, [ingredients.length, setIngredients]);

  // parsing func--------------------------
  // 오늘까지인 재료만
  const todayIngredients = useMemo(
    () => ingredients.filter((i) => i.dDay === 0),
    [ingredients],
  );

  // // 모달 오픈 조건 (그냥 새로고침하면 계속)
  // const isExpiryModalOpen = useMemo(
  //   () => ingredients.some((i) => i.dDay === 0),
  //   [ingredients],
  // );

  // 하루한번만 열리게 하는 조건 포함
  const EXPIRY_MODAL_KEY = "expiry-alert-last-shown";

  // 유통기한 모달 상태
  const [isExpiryModalOpen, setIsExpiryModalOpen] = useState(false);

  useEffect(() => {
    if (todayIngredients.length === 0) return;

    const today = new Date().toISOString().slice(0, 10);
    const lastShown = localStorage.getItem(EXPIRY_MODAL_KEY);

    if (lastShown !== today) {
      // 경고 무시용 주석
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsExpiryModalOpen(true);
      localStorage.setItem(EXPIRY_MODAL_KEY, today);
    }
  }, [todayIngredients]);

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

      {/* 유통기한 모달 */}
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
