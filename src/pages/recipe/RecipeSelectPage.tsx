// src/pages/recipe/RecipeSelectPage.tsx
// 이거 무조건 수정하긴해야함
// useIngredientStore에 persist 붙이기
// RecipeConfirmPage에서 snapshot 쓰는지 확인
// 나중에 시간 나면 recipe 선택 store 분리
import { useNavigate } from "react-router-dom";
import "../../components/recipe/main/recipe.css";
import Button from "../../components/ui/Button";
import BackHeader from "../../components/ui/BackHeader";
import Search from "../../components/fridge/features/Search";
import Sort from "../../components/fridge/features/Sort";
import Storage from "../../components/fridge/main/Storage";
import IngredientGrid from "../../components/fridge/items/IngredientGrid";

import { useIngredientStore } from "../../stores/useIngredientStore";
import { useRecipeFlowStore } from "../../stores/useRecipeFlowStore";
// import { useRecipeSelectStore } from "../../stores/useRecipeSelectStore";
import { useSortedIngredients } from "../../hooks/useSortedIngredients";

import fridgeIcon from "../../assets/fridge/fridge.svg";
import freezerIcon from "../../assets/fridge/freezer.svg";
import pantryIcon from "../../assets/fridge/pantry.svg";
import FloatingNotice from "../../components/recipe/main/FloatingNotice";

export default function RecipeSelectPage() {
  const navigate = useNavigate();

  // 데이터/검색/정렬은 fridge store
  const {
    ingredients,
    selectedIds,
    viewCategory,
    clearSelection,
    setViewCategory,
  } = useIngredientStore();

  const { sortedIngredients } = useSortedIngredients();

  const { searchTerm } = useIngredientStore();

  const filteredIngredients = searchTerm
    ? sortedIngredients.filter((item) => item.name.includes(searchTerm))
    : sortedIngredients;

  // 선택 상태는 RecipeSelect 전용
  // const { selectedIds, toggle, reset } = useRecipeSelectStore();

  // snapshot 저장용
  const { setSelectedIngredients } = useRecipeFlowStore();

  const handleConfirm = () => {
    const selectedIngredients = ingredients.filter((item) =>
      selectedIds.includes(item.id),
    );

    setSelectedIngredients(selectedIngredients); // Ingredient[]
    clearSelection(); // fridge 선택 상태만 초기화
    navigate("/recipe/confirm");
  };

  const handleBack = () => {
    if (viewCategory) {
      // 재료 전체보기 → 냉장고 UI
      setViewCategory(null);
    } else {
      // 진짜 이전 페이지
      clearSelection(); // 선택만 취소 (중요!)
      navigate(-1);
    }
  };

  const getIcon = (category: string) => {
    if (category === "냉장") return fridgeIcon;
    if (category === "냉동") return freezerIcon;
    return pantryIcon;
  };

  return (
    <div className="flex flex-col w-full pb-32">
      <BackHeader title="재료 선택" onBack={handleBack} />

      {!viewCategory && <FloatingNotice text="요리할 재료를 선택해주세요" />}

      <div className="mt-[102px]">
        <Search />

        {viewCategory ? (
          <>
            <Sort
              categoryIcon={getIcon(viewCategory)}
              viewCategory={viewCategory}
            />
            <IngredientGrid
              items={filteredIngredients}
              // selectedIds={selectedIds}
              // onToggle={toggle}
            />
          </>
        ) : (
          <>
            {/* 이 Storage는 아직 fridge 선택 로직 사용 중 */}
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
          </>
        )}
      </div>

      {!viewCategory && (
        <div className="fixed bottom-[34px] left-1/2 -translate-x-1/2">
          <Button
            size="L"
            variant="black"
            disabled={selectedIds.length === 0}
            onClick={handleConfirm}
          >
            선택 완료
          </Button>
        </div>
      )}
    </div>
  );
}
