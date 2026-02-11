import { useNavigate, useParams } from "react-router-dom";
import BackHeader from "../../components/ui/BackHeader";
import RecipeRecordContentSection from "../../components/myCookeep/record/RecipeRecordContentSection";
import RecipeDetailYoutube from "../../components/cookeeps/recipedetail/RecipeDetailYoutubeCard";
import privateIcon from "../../assets/mycookeep/record/private_icon.svg";
import publicIcon from "../../assets/mycookeep/record/public_icon.svg";
import RecordViewImageCard from "../../components/myCookeep/record/RecordViewImageCard";
import { useEffect, useState } from "react";
import {
  getMyRecipeDetail,
  MyRecipeDetail,
  updateDailyRecipe,
  updateRecipeVisibility,
} from "../../api/myRecipe";

export default function RecordDetailPage() {
  const navigate = useNavigate();
  const { recordId } = useParams();
  const [record, setRecord] = useState<MyRecipeDetail | null>(null);
  // 1. 페이지 진입 시 서버 데이터 로드
  useEffect(() => {
    if (!recordId) return;

    const fetchDetail = async () => {
      try {
        const response = await getMyRecipeDetail(Number(recordId));
        if (response.status === "OK") {
          setRecord(response.data);
        }
      } catch (error) {
        console.error("레시피 상세 조회 실패:", error);
      }
    };

    fetchDetail();
  }, [recordId]);

  const handleVisibilityChange = async (newPublicStatus: boolean) => {
    if (!record || !recordId) return;
    try {
      const response = await updateRecipeVisibility(
        Number(recordId),
        newPublicStatus,
      );
      if (response.status === "OK") {
        setRecord({ ...record, isPublic: newPublicStatus });
      }
    } catch (error) {
      console.error("공개 범위 수정 실패:", error);
      alert("변경에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleTitleChange = async (newTitle: string) => {
    if (!record || !recordId || newTitle === record.title) return;

    try {
      const response = await updateDailyRecipe(Number(recordId), {
        title: newTitle,
      });
      if (response.status === "OK") {
        setRecord(response.data);
      }
    } catch (error: any) {
      if (error.response?.status === 400) {
        alert("변경사항이 없습니다.");
      } else {
        alert("제목 수정에 실패했습니다.");
      }
    }
  };

  // const handleDescriptionChange = async (newDesc: string) => {
  //   if (!record || !recordId || newDesc === record.description) return;

  //   try {
  //     const response = await updateDailyRecipe(Number(recordId), {
  //       description: newDesc,
  //     });
  //     if (response.status === "OK") {
  //       setRecord(response.data);
  //     }
  //   } catch (error: any) {
  //     alert("한줄평 수정에 실패했습니다.");
  //   }
  // };

  if (!record) return null;

  return (
    <div className="min-h-screen w-full flex flex-col">
      <BackHeader title="레시피 보기" onBack={() => navigate(-1)} />

      <div className="flex-1 mx-auto w-full max-w-[450px] px-4 flex flex-col">
        <div className="pt-[51px] flex flex-col gap-[10px]">
          <RecordViewImageCard
            title={record.title}
            imageSrc={record.recipeImageUrl}
            onChangeTitle={handleTitleChange}
          />

          {/* 레시피 내용 */}
          <RecipeRecordContentSection
            recipe={{
              ingredients: record.content.ingredients,
              steps: record.content.steps,
            }}
          />
          {record.content.youtubeReferences &&
            record.content.youtubeReferences.length > 0 && (
              <RecipeDetailYoutube
                videos={record.content.youtubeReferences}
                tags={[]} // 상세 API에 태그 정보가 있다면 추가
              />
            )}
        </div>

        {/* 메모 */}
        {record.description && (
          <div className="mt-4 flex w-full flex-col items-center">
            <div className="w-full rounded-[10px] bg-white px-[15px] py-4 text-center typo-body text-[#202020] shadow-sm whitespace-pre-wrap break-words border border-gray-100">
              {record.description}
            </div>
          </div>
        )}

        {/* 공개 여부 수정 컨트롤 */}
        <div className="mt-[32px] flex justify-center gap-[9px] pb-9">
          {/* 나만 보기 버튼 */}
          <button
            onClick={() => handleVisibilityChange(false)}
            className={`flex h-[44px] w-[161px] items-center gap-[10px] rounded-full p-1 transition-colors
              ${record.isPublic === false ? "bg-[#96E8BE]" : "bg-[#EBEBEB]"}`}
          >
            <div className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-white">
              <img src={privateIcon} className="w-[24px]" alt="private" />
            </div>
            <span className="typo-label text-[#202020]">나만 보기</span>
          </button>

          {/* 쿠킵스 공개 버튼 */}
          <button
            onClick={() => handleVisibilityChange(true)}
            className={`flex h-[44px] w-[161px] items-center gap-[10px] rounded-full p-1 transition-colors
              ${record.isPublic === true ? "bg-[#96E8BE]" : "bg-[#EBEBEB]"}`}
          >
            <div className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-white">
              <img src={publicIcon} className="w-[36px]" alt="public" />
            </div>
            <span className="typo-label text-[#202020]">쿠킵스 공개</span>
          </button>
        </div>
      </div>
    </div>
  );
}
