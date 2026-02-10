import RecipeActionButtons from "../../components/recipe/main/result/RecipeActionButtons";
import RecipeContentSection from "../../components/recipe/main/result/RecipeContentSection";
import RecipeHeader from "../../components/recipe/main/RecipeHeader";
import RecipeTitle from "../../components/recipe/main/result/RecipeTitle";
import RecipeYoutubeCard from "../../components/recipe/main/result/RecipeYoutubeCard";
import { useRecipeFlowStore } from "../../stores/useRecipeFlowStore";
import { useMemo, useRef, useState } from "react";
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

  // 로딩중부분
  const [isLoading, setIsLoading] = useState(false);

  const { increaseRetry } = useRecipeFlowStore();

  // 버튼 클릭 핸들러를 RecipeResultPage에서 넘기는 방식으로 수정
  // RecipeResultPage.tsx 내부

  const { generateRecipe } = useRecipeFlowStore(); // generateRecipe 추가

  const handleRetry = async () => {
    if (isLoading) return;

    setIsLoading(true);
    increaseRetry(); // 시도 횟수 증가

    try {
      // 이 부분이 핵심입니다!
      // 실제로 스토어의 recipeHistory에 새 레시피가 push되어야 map이 돌아갑니다.
      // await generateRecipe();

      // API가 너무 빨리 응답하면 로딩이 순식간에 사라지니
      // 피그마 디자인을 확인하기 위해 최소 로딩 시간(예: 800ms)을 줄 수도 있습니다.
      await new Promise((resolve) => setTimeout(resolve, 800));
      await generateRecipe();
    } catch (error) {
      console.error("레시피 생성 실패:", error);
    } finally {
      setIsLoading(false);

      // 새 레시피가 추가된 후 스크롤을 아래로 내림
      setTimeout(() => {
        scrollRef.current?.scrollTo({
          top: scrollRef.current.scrollHeight,
          behavior: "smooth",
        });
      }, 100);
    }
  };

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

              {/* 마지막 레시피 하단 안내 및 로딩바 영역 */}
              {isLastRecipe && (
                <div className="flex flex-col items-center gap-[2px] self-stretch mt-[10px]">
                  {/* AI 안내 문구 */}
                  <div className="w-[361px] text-center text-[11px] leading-[14px] text-[#7D7D7D] font-pretendard">
                    AI가 제공하는 정보에는 실수가 있을 수 있습니다
                    <br />
                    관련 정보를 확인 후 활용해주세요
                  </div>

                  {/* 피그마 규격 로딩중 표시 */}
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

        {/* 버튼을 스크롤 영역 맨 마지막에 둠 */}
        {!isHistoryView && (
          <div className="p-4 w-full max-w-[450px] mx-auto">
            <RecipeActionButtons
              retryCount={retryCount}
              onRetry={handleRetry}
            />
          </div>
        )}
      </div>
    </div>
  );
}
