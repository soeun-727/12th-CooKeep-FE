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
import { useIngredientStore } from "../../../stores/useIngredientStore";
import { useSortedIngredients } from "../../../hooks/useSortedIngredients";
import ExpiryAlertModal from "../modals/ExpiryAlertModal";
import IngredientDetailModal from "../modals/IngredientDetailModal";

import {
  getRefrigeratorHome,
  type RefrigeratorHomeResponse,
} from "../../../api/ingredient";
import { getPushEligibility } from "../../../api/user";

export default function FridgeTab() {
  const {
    ingredients,
    setIngredients,
    searchTerm,
    viewCategory,
    updateIngredient,
  } = useIngredientStore();

  const parseServerData = (data: RefrigeratorHomeResponse) => {
    const mapItem = (i: any, category: string) => {
      return {
        ...i,
        category,
        id: i.ingredientId || i.id || i.referenceId || 0,
        name: i.name || "이름 없음",
        dDay: i.leftDays ?? 0,
        image: i.imageUrl || "",
        quantity: i.quantity || 1,
        unit: i.unit || "PIECE",
        expiryDate: i.expirationDate || new Date().toISOString().split("T")[0],
        createdAt: i.createdAt || new Date().toISOString(),
      };
    };

    const fridge = (data.fridge || []).map((i) => mapItem(i, "냉장"));
    const freezer = (data.freezer || []).map((i) => mapItem(i, "냉동"));
    const pantry = (data.pantry || []).map((i) => mapItem(i, "상온"));

    return [...fridge, ...freezer, ...pantry];
  };

  const { filteredIngredients, sortedIngredients } = useSortedIngredients();

  const todayIngredients = useMemo(
    () => ingredients.filter((i) => i.dDay === 0),
    [ingredients],
  );

  const EXPIRY_MODAL_KEY = "expiry-alert-last-shown";
  const [isExpiryModalOpen, setIsExpiryModalOpen] = useState(false);

  useEffect(() => {
    const initFridgeData = async () => {
      try {
        // 1. 냉장고 데이터 먼저 로드
        const response = await getRefrigeratorHome();
        const targetData = response.data.data || response.data;

        if (targetData) {
          const parsed = parseServerData(targetData);
          setIngredients(parsed);

          // 2. 데이터 세팅이 끝난 후, 팝업 자격 확인
          const today = new Date().toISOString().slice(0, 10);
          const lastShown = localStorage.getItem(EXPIRY_MODAL_KEY);

          if (lastShown !== today) {
            const eligibility = await getPushEligibility();

            // 🚀 조건 추가: 서버에서도 true라고 하고, 실제로 dDay가 0인 아이템이 있을 때만 오픈
            const hasTodayItems = parsed.some((i) => i.dDay === 0);

            if (eligibility && eligibility.eligible && hasTodayItems) {
              setIsExpiryModalOpen(true);
              localStorage.setItem(EXPIRY_MODAL_KEY, today);
            }
          }
        }
      } catch (error) {
        console.error("냉장고 초기화 실패:", error);
      }
    };

    initFridgeData();
  }, [setIngredients]);

  const { selectedIngredientId, closeDetail } = useIngredientStore();
  const selectedIngredient = ingredients.find(
    (i) => i.id === selectedIngredientId,
  );

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
      {isExpiryModalOpen && todayIngredients.length > 0 && (
        <ExpiryAlertModal
          isOpen={isExpiryModalOpen}
          onClose={() => setIsExpiryModalOpen(false)}
          items={todayIngredients}
        />
      )}

      {isSearching &&
        (filteredIngredients.length > 0 ? (
          <IngredientGrid items={filteredIngredients} />
        ) : (
          <NoResultView />
        ))}
      {isListView && (
        <>
          <Sort
            categoryIcon={getCategoryIcon(viewCategory)}
            viewCategory={viewCategory!}
          />
          <IngredientGrid items={sortedIngredients} />
        </>
      )}

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
          onUpdate={(updated) =>
            updateIngredient({ ...selectedIngredient, ...updated })
          }
        />
      )}
    </div>
  );
}
