import RecipeRankCard from "./RecipeRankCard";
import RecipeFilterButtons from "./RecipeFilterButtons";
import { RecipeRankItem } from "../../../api/cookeeps";
import tempImage from "../../../assets/cookeeps/main/temp_recipe_cookeeps.svg";
interface WeeklyRecipeSectionProps {
  topRecipes: RecipeRankItem[];
}

export default function WeeklyRecipeSection({
  topRecipes,
}: WeeklyRecipeSectionProps) {
  // 현재 날짜 기준 "n월 n주차" 계산
  const now = new Date();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const weekNumber = Math.ceil(date / 7);

  return (
    <div className="flex flex-col items-center w-full min-h-[259px] max-w-md mx-auto bg-white p-4 gap-4 rounded-lg shadow-md">
      {/* 제목 */}
      <h2 className="text-center font-semibold text-[18px] leading-[26px]">
        <span className="text-[#1FC16F]">
          {month}월 {weekNumber}번째 주
        </span>{" "}
        <span className="text-gray-800">쿠킵이들이 만든 레시피</span>
      </h2>

      {/* 버튼 + 리스트 */}
      <div className="flex flex-col w-full gap-2">
        <RecipeFilterButtons />

        <div className="flex flex-col gap-1 w-full">
          {topRecipes.map((recipe) => (
            <RecipeRankCard
              key={recipe.dailyRecipeId}
              id={String(recipe.dailyRecipeId)}
              rank={recipe.rank}
              title={recipe.title}
              image={recipe.recipeImageUrl || tempImage}
              likes={recipe.likeCount}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
