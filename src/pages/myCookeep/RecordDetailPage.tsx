import { useNavigate, useParams } from "react-router-dom";
import { useCookeepRecordStore } from "../../stores/useCookeepRecordStore";
import BackHeader from "../../components/ui/BackHeader";
import RecipeRecordContentSection from "../../components/myCookeep/record/RecipeRecordContentSection";
import RecipeDetailYoutube from "../../components/cookeeps/recipedetail/RecipeDetailYoutubeCard";
import privateIcon from "../../assets/mycookeep/record/private_icon.svg";
import publicIcon from "../../assets/mycookeep/record/public_icon.svg";
import { useEffect, useMemo } from "react";
import RecordViewImageCard from "../../components/myCookeep/record/RecordViewImageCard";
import tempFoodPhoto from "../../assets/mycookeep/record/temp_food_photo.svg";

export default function RecordDetailPage() {
  const navigate = useNavigate();
  const { recordId } = useParams();

  const records = useCookeepRecordStore((s) => s.records);
  const updateRecordRecipe = useCookeepRecordStore((s) => s.updateRecordRecipe);

  const record = records.find((r) => r.id === recordId);

  const imageUrl = useMemo(() => {
    if (!record?.images[0]) return undefined;
    return URL.createObjectURL(record.images[0]);
  }, [record]);

  const imageSrc = imageUrl ?? tempFoodPhoto;

  useEffect(() => {
    return () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl);
    };
  }, [imageUrl]);

  if (!record) return null;

  return (
    <div className="min-h-screen w-full flex flex-col">
      <BackHeader title="레시피 상세" onBack={() => navigate(-1)} />

      <div className="flex-1 mx-auto w-full max-w-[450px] px-4 flex flex-col">
        <div className="pt-[51px] flex flex-col gap-[10px]">
          {/* 이미지 + 제목 (읽기 전용) 일단 버튼만있고 수정안됨 */}
          <RecordViewImageCard
            title={record.recipeTitle}
            imageSrc={imageSrc}
            onChangeTitle={(newTitle) => {
              updateRecordRecipe({
                recordId: record.id,
                recipeId: record.recipeId,
                recipeTitle: newTitle,
              });
            }}
          />

          {/* 레시피 내용 */}
          <RecipeRecordContentSection recipe={record.recipeContent} />

          {record.relatedVideos && record.relatedVideos.length > 0 && (
            <RecipeDetailYoutube
              videos={record.relatedVideos}
              tags={record.tags}
            />
          )}
        </div>

        {/* 메모 */}
        {record.memo && (
          <div className="mt-4 flex w-full flex-col items-center">
            <div
              className="
      w-full
      rounded-[10px]
      bg-white
      px-[10px]
      py-3
      text-center
      typo-body
      text-[#202020]
      shadow
      whitespace-pre-wrap
      break-words
    "
            >
              {record.memo}
            </div>
          </div>
        )}

        {/* 공개 여부 표시 */}
        <div className="mt-[32px] flex justify-center gap-[9px]">
          <div
            className={`flex h-[44px] w-[161px] items-center gap-[10px] rounded-full p-1
              ${record.isPublic === false ? "bg-[#96E8BE]" : "bg-[#EBEBEB]"}`}
          >
            <div className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-white">
              <img src={privateIcon} className="w-[24px]" />
            </div>
            <span className="typo-label">나만 보기</span>
          </div>

          <div
            className={`flex h-[44px] w-[161px] items-center gap-[10px] rounded-full p-1
              ${record.isPublic === true ? "bg-[#96E8BE]" : "bg-[#EBEBEB]"}`}
          >
            <div className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-white">
              <img src={publicIcon} className="w-[36px]" />
            </div>
            <span className="typo-label">쿠킵스 공개</span>
          </div>
        </div>
      </div>
    </div>
  );
}
