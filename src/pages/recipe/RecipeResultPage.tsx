import RecipeActionButtons from "../../components/recipe/main/result/RecipeActionButtons";
import RecipeContentSection from "../../components/recipe/main/result/RecipeContentSection";
import RecipeHeader from "../../components/recipe/main/result/RecipeHeader";
import RecipeTitle from "../../components/recipe/main/result/RecipeTitle";
import RecipeYoutubeCard from "../../components/recipe/main/result/RecipeYoutubeCard";
import { useRecipeFlowStore } from "../../stores/useRecipeFlowStore";
import { useRef } from "react";

export default function RecipeResultPage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { recipeHistory, selectedIngredients, difficulty, retryCount } =
    useRecipeFlowStore();

  if (recipeHistory.length === 0) return null;

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <RecipeHeader />

      {/* 스크롤 영역 */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto flex flex-col gap-9 px-4 pt-[129px]"
      >
        {recipeHistory.map((recipe, idx) => {
          const requiredIngredients = recipe.ingredients
            .filter((i) => i.isRequired)
            .map((i) => i.name);

          return (
            <div
              key={idx}
              className="flex flex-col gap-2 w-full max-w-[361px] mx-auto"
            >
              <RecipeTitle name={recipe.recipeName} />

              <RecipeContentSection
                selectedIngredients={selectedIngredients.map((i) => i.name)}
                requiredIngredients={requiredIngredients}
                substitutions={recipe.substitutions ?? []}
                steps={recipe.steps}
                difficulty={difficulty || "normal"}
              />

              {recipe.relatedVideos && (
                <RecipeYoutubeCard
                  videos={recipe.relatedVideos}
                  tags={recipe.tags ?? []}
                />
              )}
            </div>
          );
        })}

        {/* 버튼을 스크롤 영역 맨 마지막에 둠 */}
        <div className="p-4 w-full max-w-[450px] mx-auto">
          <RecipeActionButtons retryCount={retryCount} />
        </div>
      </div>
    </div>
  );
}
