import { useNavigate } from "react-router-dom";

import cookChar from "../../assets/recipe/main/cook_char.svg";
import Button from "../../components/ui/Button";
import RecipeHeader from "../../components/recipe/main/RecipeHeader";
import { useIngredientSelectStore } from "../../stores/useIngredientSelectStore";
import { useEffect } from "react";
import { useRecipeFlowStore } from "../../stores/useRecipeFlowStore";

export default function RecipeIntroPage() {
  const navigate = useNavigate();

  useEffect(() => {
    useIngredientSelectStore.getState().reset();
    useRecipeFlowStore.getState().reset();
  }, []);

  return (
    <div className="relative h-[calc(100vh-90px)] flex justify-center overflow-hidden">
      {/* 1. 헤더 추가 (제목 없음) */}
      <RecipeHeader transparent />

      {/* 배경 blur */}
      <div
        className="
          absolute
          top-[72px]
          left-1/2
          -translate-x-1/2
          w-[434px]
          h-[433px]
          rounded-full
          bg-[rgba(31,193,111,0.15)]
          blur-[125px]
           pointer-events-none
        "
      />

      {/* 콘텐츠 */}
      <div className="flex flex-col items-center w-[361px] gap-[28px] mt-[203.62px]">
        <img
          src={cookChar}
          alt="요리 캐릭터"
          className="w-[162.5px] h-[116.646px]"
        />

        <div className="flex flex-col items-center h-[144px] gap-[28px] self-stretch">
          <h1 className="text-center text-[28px] font-bold leading-[36px] text-[#202020]">
            지금 있는 재료로
            <br />
            요리해볼까요?
          </h1>

          <div className="w-[249px] h-[44px]">
            <Button
              size="S"
              variant="black"
              onClick={() => navigate("/recipe/select")}
              className="w-full h-full !text-[#32E389]"
            >
              요리할 재료를 선택할까요?
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
