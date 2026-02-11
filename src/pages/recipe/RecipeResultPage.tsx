import RecipeActionButtons from "../../components/recipe/main/result/RecipeActionButtons";
import RecipeContentSection from "../../components/recipe/main/result/RecipeContentSection";
import RecipeHeader from "../../components/recipe/main/RecipeHeader";
import RecipeTitle from "../../components/recipe/main/result/RecipeTitle";
import RecipeYoutubeCard from "../../components/recipe/main/result/RecipeYoutubeCard";
import { useRecipeFlowStore } from "../../stores/useRecipeFlowStore";
import { useRef, useState } from "react";

export default function RecipeResultPage() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const { recipeHistory, difficulty, retryCount, generateRecipe } =
    useRecipeFlowStore();

  const [isLoading, setIsLoading] = useState(false);

  const handleRetry = async () => {
    if (isLoading) return;
    if (retryCount >= 5) return; // 5회 제한

    setIsLoading(true);

    try {
      await generateRecipe();
    } catch (error) {
      console.error("레시피 생성 실패:", error);
    } finally {
      setIsLoading(false);

      setTimeout(() => {
        scrollRef.current?.scrollTo({
          top: scrollRef.current.scrollHeight,
          behavior: "smooth",
        });
      }, 100);
    }
  };

  if (!recipeHistory.length) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        레시피를 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-gray-50">
      <RecipeHeader title="오늘의 레시피" />

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto no-scrollbar flex flex-col gap-9 px-4 pt-[75px]"
      >
        {recipeHistory.map((data, index) => {
          const recipe = data.recipe;
          const isLastRecipe = index === recipeHistory.length - 1;

          const requiredIngredients = recipe.ingredients.user_ingredients.map(
            (i) => i.name,
          );

          return (
            <div key={index}>
              <RecipeTitle name={recipe.title} />

              <RecipeContentSection
                selectedIngredients={requiredIngredients}
                requiredIngredients={requiredIngredients}
                substitutions={recipe.ingredients.optional_ingredients.map(
                  (i) => ({
                    original: i.name,
                    replacement: "생략 가능",
                  }),
                )}
                steps={recipe.steps.map((step, idx) => ({
                  order: idx + 1,
                  description: step,
                }))}
                difficulty={difficulty || "NORMAL"}
              />

              <RecipeYoutubeCard
                videos={data.youtubeReferences}
                tags={recipe.youtube_search_queries}
              />

              {isLastRecipe && (
                <div className="flex flex-col items-center gap-[2px] self-stretch mt-[10px]">
                  <div className="w-[361px] text-center text-[11px] leading-[14px] text-[#7D7D7D] font-pretendard">
                    AI가 제공하는 정보에는 실수가 있을 수 있습니다
                    <br />
                    관련 정보를 확인 후 활용해주세요
                  </div>

                  {isLoading && (
                    <div className="flex w-[28.8px] h-[28.8px] justify-center items-center gap-[3.6px]">
                      <div className="w-[4.8px] h-[4.8px] rounded-full animate-dot" />
                      <div className="w-[4.8px] h-[4.8px] rounded-full animate-dot delay-200" />
                      <div className="w-[4.8px] h-[4.8px] rounded-full animate-dot delay-400" />
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {/* 버튼 영역 */}
        <div className="p-4 w-full max-w-[450px] mx-auto">
          <RecipeActionButtons retryCount={retryCount} onRetry={handleRetry} />
        </div>
      </div>
    </div>
  );
}
