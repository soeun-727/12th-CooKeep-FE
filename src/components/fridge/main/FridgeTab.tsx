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
  useEffect(() => {
    const fetchFridgeData = async () => {
      try {
        const response = await getRefrigeratorHome();

        // 🚀 [디버깅] 서버에서 오는 순수 응답 전체를 찍어봅니다.
        console.log("1. API 전체 응답(Axios Response):", response);

        // response 자체가 없거나 status가 성공이 아닌 경우 체크
        if (!response || !response.data) {
          console.error("서버 응답이 없거나 data 필드가 없습니다.");
          return;
        }

        // 🚀 [디버깅] data 필드 내부를 확인합니다.
        console.log("2. 서버 데이터(response.data):", response.data);

        // 서버 응답 구조에 따라 response.data를 보낼지, response.data.data를 보낼지 결정
        const targetData = response.data.data || response.data;

        if (targetData) {
          const parsed = parseServerData(targetData);
          setIngredients(parsed);
        }
      } catch (error: any) {
        // 🚀 [에러 상세 로그] 빨간 에러 메시지의 정체를 확인합니다.
        console.error("3. 냉장고 데이터 로드 실패 상세:", {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
        });
      }
    };
    fetchFridgeData();
  }, [setIngredients]);

  const { filteredIngredients, sortedIngredients } = useSortedIngredients();

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
