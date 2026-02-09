import RecipeActionButtons from "../../components/recipe/main/result/RecipeActionButtons";
import RecipeContentSection from "../../components/recipe/main/result/RecipeContentSection";
import RecipeHeader from "../../components/recipe/main/RecipeHeader";
import RecipeTitle from "../../components/recipe/main/result/RecipeTitle";
import RecipeYoutubeCard from "../../components/recipe/main/result/RecipeYoutubeCard";
import { useRecipeFlowStore } from "../../stores/useRecipeFlowStore";
import { useMemo, useRef } from "react";
import { useParams } from "react-router-dom";
import { MOCK_RECIPE_SESSIONS } from "../../constants/mockSessions";

export default function RecipeResultPage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { sessionId } = useParams<{ sessionId: string }>();
  const isHistoryView = !!sessionId;

  const { recipeHistory, selectedIngredients, difficulty, retryCount } =
    useRecipeFlowStore();

  const selectedIngredientNames = isHistoryView
    ? []
    : selectedIngredients.map((i) => i.name);

  const recipeDifficulty = isHistoryView ? "normal" : difficulty || "normal";

  const sessionRecipes = useMemo(() => {
    if (!isHistoryView || !sessionId) return [];

    return (
      MOCK_RECIPE_SESSIONS.find((s) => s.sessionId === Number(sessionId))
        ?.recipes ?? []
    );
  }, [isHistoryView, sessionId]);

  const recipesToRender = isHistoryView ? sessionRecipes : recipeHistory;

  if (!recipesToRender.length) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        레시피를 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-gray-50">
      <RecipeHeader title="오늘의 레시피" />

      {/* 스크롤 영역 */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto no-scrollbar flex flex-col gap-9 px-4 pt-[75px]"
      >
        {/* {recipeHistory.map((recipe, idx) => { */}
        {recipesToRender.map((recipe, index) => {
          const requiredIngredients = recipe.ingredients
            .filter((i) => i.isRequired)
            .map((i) => i.name);

          const isLastRecipe = index === recipesToRender.length - 1;

          return (
            <div
              key={recipe.id}
              className="flex flex-col gap-2 w-full max-w-[361px] mx-auto"
            >
              <RecipeTitle name={recipe.recipeName} />

              {/* <RecipeContentSection
                selectedIngredients={selectedIngredients.map((i) => i.name)}
                requiredIngredients={requiredIngredients}
                substitutions={recipe.substitutions ?? []}
                steps={recipe.steps}
                difficulty={difficulty || "normal"}
              /> */}
              <RecipeContentSection
                selectedIngredients={selectedIngredientNames}
                requiredIngredients={requiredIngredients}
                substitutions={recipe.substitutions ?? []}
                steps={recipe.steps}
                difficulty={recipeDifficulty}
              />

              {recipe.relatedVideos && (
                <RecipeYoutubeCard
                  videos={recipe.relatedVideos}
                  tags={recipe.tags ?? []}
                />
              )}

              {/* 마지막 레시피에만 AI 안내 문구 */}
              {isLastRecipe && (
                <div
                  className="
            flex justify-center
            mt-[10px]
            w-full
            text-center
            text-[11px] leading-[14px]
            text-[#7D7D7D]
            font-pretendard
          "
                >
                  <div className="w-[361px]">
                    AI가 제공하는 정보에는 실수가 있을 수 있습니다
                    <br />
                    관련 정보를 확인 후 활용해주세요
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* 버튼을 스크롤 영역 맨 마지막에 둠 */}
        {!isHistoryView && (
          <div className="p-4 w-full max-w-[450px] mx-auto">
            <RecipeActionButtons retryCount={retryCount} />
          </div>
        )}
      </div>
    </div>
  );
}
