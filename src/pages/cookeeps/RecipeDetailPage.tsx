import { useNavigate, useParams } from "react-router-dom";
import BackHeader from "../../components/ui/BackHeader";
import { MOCK_DETAIL_RECIPES } from "../../constants/mockDetailRecipes";
import RecipeDetailUserMeta from "../../components/cookeeps/recipedetail/RecipeDetailUserMeta";
import RecipeDetailImageCard from "../../components/cookeeps/recipedetail/RecipeDetailImageCard";
import RecipeDetailContentSection from "../../components/cookeeps/recipedetail/RecipeDetailContentSection";
import RecipeDetailYoutube from "../../components/cookeeps/recipedetail/RecipeDetailYoutubeCard";
import RecipeDetailMemo from "../../components/cookeeps/recipedetail/RecipeDetailMemo";

export default function RecipeDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const recipe = MOCK_DETAIL_RECIPES.find((r) => r.id === id);

  if (!recipe) return null;

  return (
    <div className="min-h-screen w-full">
      <div className="mx-auto w-full max-w-[450px] px-4">
        {/* 헤더 */}
        <BackHeader title="레시피 보기" onBack={() => navigate(-1)} />
        <div className="flex flex-col mx-auto pt-[51px]">
          {/* 유저 메타 */}
          <RecipeDetailUserMeta userName={recipe.user.name} />

          {/* 메인 콘텐츠 */}
          <div className="flex flex-col items-start gap-4 self-stretch w-full">
            <div className="flex flex-col items-center gap-[10px] w-full">
              <div className="flex flex-col items-start self-stretch w-full">
                <RecipeDetailImageCard
                  images={recipe.userImages}
                  title={recipe.recipeName}
                />
              </div>

              <RecipeDetailContentSection recipe={recipe} />

              {recipe.relatedVideos && (
                <RecipeDetailYoutube
                  videos={recipe.relatedVideos}
                  tags={recipe.tags}
                />
              )}
            </div>
          </div>

          {/* 메모 */}
          <div className="flex flex-col items-center gap-2 w-full mt-4">
            {recipe.memo && (
              <RecipeDetailMemo
                userName={recipe.user.name}
                memo={recipe.memo}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
