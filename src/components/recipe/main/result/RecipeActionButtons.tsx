import { useNavigate } from "react-router-dom";
import { useRecipeFlowStore } from "../../../../stores/useRecipeFlowStore";

interface Props {
  retryCount: number;
  maxRetry?: number;
}

export default function RecipeActionButtons({
  retryCount,
  maxRetry = 5,
}: Props) {
  const navigate = useNavigate();

  const {
    increaseRetry,
    generateRecipe,
    selectedIngredients,
    difficulty,
    recipeHistory,
  } = useRecipeFlowStore();

  const latestRecipe = recipeHistory.at(-1);

  const isMaxed = retryCount >= maxRetry - 1;
  const retryBtnText = `다른 레시피 받기 (${retryCount + 1}/${maxRetry})`;

  const handleRetry = () => {
    increaseRetry();
    generateRecipe();
  };

  const handleCookClick = () => {
    if (!latestRecipe) return;

    navigate("/mypage", {
      state: {
        selectedIngredients,
        difficulty,
        recipeData: latestRecipe,
      },
    });
  };

  return (
    <div className="flex flex-col items-center gap-2 w-full">
      {/* 요리할래요 버튼 */}
      <button
        onClick={handleCookClick}
        disabled={!latestRecipe}
        className="w-full rounded-[10px] h-[38px] typo-button text-white bg-[#32E389]"
      >
        이 레시피대로 요리할래요
      </button>

      {/* 다른 레시피 버튼 */}
      <button
        onClick={handleRetry}
        disabled={isMaxed}
        className={`w-full rounded-[10px] h-[38px] typo-button ${
          isMaxed ? "bg-gray-300 text-[#7D7D7D]" : "bg-[#202020] text-white"
        }`}
      >
        {retryBtnText}
      </button>
    </div>
  );
}
