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
import { useCookeepRecordStore } from "../../stores/useCookeepRecordStore";

export default function RecipeDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const records = useCookeepRecordStore((state) => state.records);
  const updateRecordLike = useCookeepRecordStore(
    (state) => state.updateRecordLike,
  );
  const updateRecordBookmark = useCookeepRecordStore(
    (state) => state.updateRecordBookmark,
  );
  const [recipe, setRecipe] = useState<WeeklyRecipeDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const storeRecord = records.find((r) => String(r.dailyRecipeId) === id);
  // 화면에 보여줄 데이터 (스토어에 있으면 스토어꺼, 없으면 서버에서 받아온 상세 데이터 사용)
  const isLiked = storeRecord ? storeRecord.liked : recipe?.liked;
  const isBookmarked = storeRecord
    ? storeRecord.bookmarked
    : recipe?.bookmarked;

  // 좋아요 토글 핸들러
  // 좋아요 토글 핸들러
  const handleLikeToggle = async () => {
    if (!id || !recipe) return;

    // 1. 전역 스토어 업데이트 (목록 페이지를 위해)
    await updateRecordLike(id);

    // 2. ✅ 현재 상세 페이지의 로컬 상태 업데이트 (화면 반영을 위해)
    setRecipe((prev) => {
      if (!prev) return prev;
      const nextLiked = !prev.liked;
      return {
        ...prev,
        liked: nextLiked,
        likeCount: nextLiked ? prev.likeCount + 1 : prev.likeCount - 1,
      };
    });
  };

  // 북마크 토글 핸들러
  const handleBookmarkToggle = async () => {
    if (!id || !recipe) return;

    // 1. 전역 스토어 업데이트
    await updateRecordBookmark(id);

    // 2. ✅ 현재 상세 페이지의 로컬 상태 업데이트
    setRecipe((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        bookmarked: !prev.bookmarked,
      };
    });
  };

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
      <BackHeader title="레시피 보기" onBack={() => navigate(-1)} />
      <div className="mx-auto w-full max-w-[450px] px-4">
        {/* 헤더 */}

        <div className="flex flex-col mx-auto pt-[51px]">
          {/* 유저 메타 */}
          <RecipeDetailUserMeta
            userName={recipe.nickname}
            isLiked={!!isLiked}
            isBookmarked={!!isBookmarked} // 👈 이제 이 값이 변하면서 자식을 다시 그립니다.
            onLike={handleLikeToggle}
            onBookmark={handleBookmarkToggle}
          />

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
          <div className="flex flex-col items-center gap-2 w-full mt-4 pb-25">
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
