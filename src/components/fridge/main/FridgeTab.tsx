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
import { useSortedIngredients } from "../../../hooks/useSortedIngredients";
import ExpiryAlertModal from "../modals/ExpiryAlertModal";
import IngredientDetailModal from "../modals/IngredientDetailModal";

// 🚀 API 및 타입 임포트 (경로 확인 필요)
import {
  getRefrigeratorHome,
  type RefrigeratorResponse,
} from "../../../api/ingredient";

export default function FridgeTab() {
  const {
    ingredients,
    setIngredients,
    searchTerm,
    viewCategory,
    updateIngredient,
  } = useIngredientStore();

  const parseServerData = (data: RefrigeratorResponse) => {
    const mapItem = (i: any, category: string) => ({
      ...i,
      category,
      id: `${i.type}-${i.referenceId}`,
      dDay: i.leftDays,
      image: i.imageUrl,
      quantity: 1,
      unit: "PIECE",
      expiryDate: new Date().toISOString().split("T")[0],
      createdAt: new Date().toISOString(),
    });

    const fridge = data.fridge.map((i) => mapItem(i, "냉장"));
    const freezer = data.freezer.map((i) => mapItem(i, "냉동"));
    const pantry = data.pantry.map((i) => mapItem(i, "상온"));

    return [...fridge, ...freezer, ...pantry];
  };

  const { filteredIngredients, sortedIngredients } = useSortedIngredients();

  // 데이터 로드
  useEffect(() => {
    const fetchFridgeData = async () => {
      try {
        const response = await getRefrigeratorHome();
        const parsed = parseServerData(response.data);
        setIngredients(parsed);
      } catch (error) {
        console.error("냉장고 데이터 로드 실패:", error);
        if (ingredients.length === 0) setIngredients(TEMP_DATA);
      }
    };
    fetchFridgeData();
  }, [setIngredients]);

  const todayIngredients = useMemo(
    () => ingredients.filter((i) => i.dDay === 0),
    [ingredients],
  );

  const EXPIRY_MODAL_KEY = "expiry-alert-last-shown";
  const [isExpiryModalOpen, setIsExpiryModalOpen] = useState(false);

  useEffect(() => {
    if (todayIngredients.length === 0) return;
    const today = new Date().toISOString().slice(0, 10);
    const lastShown = localStorage.getItem(EXPIRY_MODAL_KEY);
    if (lastShown !== today) {
      setIsExpiryModalOpen(true);
      localStorage.setItem(EXPIRY_MODAL_KEY, today);
    }
  }, [todayIngredients]);

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
      <ExpiryAlertModal
        isOpen={isExpiryModalOpen}
        onClose={() => setIsExpiryModalOpen(false)}
        items={todayIngredients}
      />

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
