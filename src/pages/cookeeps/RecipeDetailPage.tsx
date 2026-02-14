import { useNavigate, useParams } from "react-router-dom";
import BackHeader from "../../components/ui/BackHeader";
import RecipeDetailUserMeta from "../../components/cookeeps/recipedetail/RecipeDetailUserMeta";
import RecipeDetailImageCard from "../../components/cookeeps/recipedetail/RecipeDetailImageCard";
import RecipeDetailContentSection from "../../components/cookeeps/recipedetail/RecipeDetailContentSection";
import RecipeDetailYoutube from "../../components/cookeeps/recipedetail/RecipeDetailYoutubeCard";
import RecipeDetailMemo from "../../components/cookeeps/recipedetail/RecipeDetailMemo";
import { useEffect, useState } from "react";
import {
  getWeeklyRecipeDetail,
  WeeklyRecipeDetailResponse,
} from "../../api/cookeeps";

export default function RecipeDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [recipe, setRecipe] = useState<WeeklyRecipeDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchDetail = async () => {
      try {
        const data = await getWeeklyRecipeDetail(id);
        setRecipe(data);
      } catch (error) {
        console.error("레시피 상세 로드 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        로딩 중...
      </div>
    );
  if (!recipe)
    return (
      <div className="min-h-screen flex items-center justify-center">
        레시피를 찾을 수 없습니다.
      </div>
    );

  return (
    <div className="min-h-screen w-full">
      <div className="mx-auto w-full max-w-[450px] px-4">
        {/* 헤더 */}
        <BackHeader title="레시피 보기" onBack={() => navigate(-1)} />
        <div className="flex flex-col mx-auto pt-[51px]">
          {/* 유저 메타 */}
          <RecipeDetailUserMeta userName={recipe.nickname} />

          {/* 메인 콘텐츠 */}
          <div className="flex flex-col items-start gap-4 self-stretch w-full">
            <div className="flex flex-col items-center gap-[10px] w-full">
              <div className="flex flex-col items-start self-stretch w-full">
                <RecipeDetailImageCard
                  images={recipe.recipeImageUrl ? [recipe.recipeImageUrl] : []}
                  title={recipe.title}
                />
              </div>

              {/* 레시피 내용 섹션 */}
              <RecipeDetailContentSection
                recipe={{
                  ingredients: {
                    user_ingredients:
                      recipe.content.ingredients.user_ingredients,
                    optional_ingredients:
                      recipe.content.ingredients.optional_ingredients,
                    additional_ingredients:
                      recipe.content.ingredients.additional_ingredients,
                  },
                  steps: recipe.content.steps,
                }}
              />
              {recipe.content.youtubeReferences &&
                recipe.content.youtubeReferences.length > 0 && (
                  <RecipeDetailYoutube
                    videos={recipe.content.youtubeReferences}
                    tags={[]} // 서버 응답에 태그가 없다면 빈 배열
                  />
                )}
            </div>
          </div>

          {/* 메모 */}
          <div className="flex flex-col items-center gap-2 w-full mt-4 pb-15">
            {recipe.description && (
              <RecipeDetailMemo
                userName={recipe.nickname}
                memo={recipe.description}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
