import { useNavigate, useParams } from "react-router-dom";
import BackHeader from "../../components/ui/BackHeader";
import RecipeRecordContentSection from "../../components/myCookeep/record/RecipeRecordContentSection";
import RecipeDetailYoutube from "../../components/cookeeps/recipedetail/RecipeDetailYoutubeCard";
import privateIcon from "../../assets/mycookeep/record/private_icon.svg";
import publicIcon from "../../assets/mycookeep/record/public_icon.svg";
import optionIcon from "../../assets/mycookeep/record/options.svg";
import RecordViewImageCard from "../../components/myCookeep/record/RecordViewImageCard";
import { useEffect, useState } from "react";
import {
  getMyRecipeDetail,
  MyRecipeDetail,
  updateDailyRecipe,
  updateRecipeVisibility,
} from "../../api/myRecipe";
import Button from "../../components/ui/Button";

export default function RecordDetailPage() {
  const navigate = useNavigate();
  const { recordId } = useParams();

  const [record, setRecord] = useState<MyRecipeDetail | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [tempTitle, setTempTitle] = useState("");
  const [tempDescription, setTempDescription] = useState("");

  useEffect(() => {
    if (!recordId) return;
    const fetchDetail = async () => {
      try {
        const response = await getMyRecipeDetail(Number(recordId));
        if (response.status === "OK") {
          setRecord(response.data);
          setTempTitle(response.data.title);
          setTempDescription(response.data.description || "");
        }
      } catch (error) {
        console.error("레시피 상세 조회 실패:", error);
      }
    };
    fetchDetail();
  }, [recordId]);

  const handleVisibilityChange = async (newPublicStatus: boolean) => {
    if (!record || !recordId || isSubmitting) return;
    setIsSubmitting(true);
    try {
      const response = await updateRecipeVisibility(
        Number(recordId),
        newPublicStatus,
      );
      if (response.status === "OK") {
        setRecord({ ...record, isPublic: newPublicStatus });
      }
    } catch (error) {
      alert("공개 범위 변경에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setIsMenuOpen(false);
  };

  // 4. 삭제 로직 (필요 시 API 추가 연동)
  const handleDelete = () => {
    if (window.confirm("정말로 이 기록을 삭제하시겠습니까?")) {
      // TODO: deleteDailyRecipe API 호출 후 navigate("/mycookeep")
      setIsMenuOpen(false);
    }
  };

  const handleUpdate = async () => {
    if (!record || !recordId) return;

    // 변경사항이 없는 경우 서버 요청 없이 모드만 종료
    if (
      tempTitle === record.title &&
      tempDescription === (record.description || "")
    ) {
      setIsEditing(false);
      return;
    }

    try {
      const response = await updateDailyRecipe(Number(recordId), {
        title: tempTitle,
        description: tempDescription,
      });

      if (response.status === "OK") {
        setRecord(response.data); // 서버에서 온 최신 데이터로 UI 갱신
        setIsEditing(false); // 수정 모드 종료
      }
    } catch (error: any) {
      console.error("수정 실패:", error);
      alert(error.response?.data?.message || "수정에 실패했습니다.");
    }
  };

  if (!record) return null;

  return (
    <div className="min-h-screen w-full flex flex-col">
      <div className="relative flex items-center w-full max-w-[450px] mx-auto">
        <BackHeader title="레시피 보기" onBack={() => navigate(-1)} />
        <div className="absolute right-2 top-2 flex items-center">
          {/* 드롭다운 메뉴 (Sort 컴포넌트 스타일 계승) */}
          {isMenuOpen && (
            <div className="absolute right-2 top-10 flex flex-col items-center justify-center bg-white rounded-[10px] w-[102px] h-[68px] shadow-[0_1px_8.2px_-2px_#11111140] animate-fadeIn z-50 overflow-hidden">
              {/* 수정하기 버튼 */}
              <button
                onClick={handleEdit}
                className="w-full h-[34px] text-[10px] font-semibold hover:bg-gray-50 transition-colors"
              >
                수정하기
              </button>

              {/* 구분선 */}
              <div className="w-[80px] h-[0.5px] bg-[#D1D1D1]" />

              {/* 삭제하기 버튼 */}
              <button
                onClick={handleDelete}
                className="w-full h-[34px] text-[10px] font-semibold hover:bg-gray-50 transition-colors"
              >
                삭제하기
              </button>
            </div>
          )}

          {/* 옵션 아이콘 버튼 */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-9 h-9 flex items-center justify-center relative z-[110]"
          >
            <img src={optionIcon} className="w-1" alt="option" />
          </button>
        </div>
      </div>
      <div className="flex-1 mx-auto w-full max-w-[450px] px-4 flex flex-col">
        <div className="pt-[51px] flex flex-col gap-[10px]">
          <RecordViewImageCard
            title={tempTitle}
            imageSrc={record.recipeImageUrl}
            isEditing={isEditing}
            onChangeTitle={(newTitle) => setTempTitle(newTitle)}
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
        <div className="mt-4 flex w-full flex-col items-center justify-center">
          {isEditing ? (
            <textarea
              value={tempDescription}
              onChange={(e) => setTempDescription(e.target.value)}
              placeholder="나만의 팁 작성하기"
              className="overflow-hidden w-full h-12 rounded-[10px] bg-white px-[15px] py-3 text-center typo-body text-[#202020] shadow-sm whitespace-pre-wrap break-words border-[1px] border-[#32E389] outline-none resize-none"
            />
          ) : (
            record.description && (
              <div className="w-full rounded-[10px] bg-white px-[15px] py-4 text-center typo-body text-[#202020] shadow-sm whitespace-pre-wrap break-words border border-gray-100">
                {record.description}
              </div>
            )
          )}
        </div>

        {/* 공개 여부 수정 컨트롤 */}
        <div className="mt-[32px] flex justify-center gap-[9px] pb-9">
          {/* 나만 보기 버튼 */}
          <button
            disabled={isSubmitting}
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
            disabled={isSubmitting}
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
        {isEditing && (
          <div className=" flex mt-2 mb-2">
            <Button size="L" variant="black" onClick={handleUpdate}>
              수정 완료
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
