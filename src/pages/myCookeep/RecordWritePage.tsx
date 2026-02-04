import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackHeader from "../../components/ui/BackHeader";
import Button from "../../components/ui/Button";
import { useCookeepRecordStore } from "../../stores/useCookeepRecordStore";
import RecipeDetailYoutube from "../../components/cookeeps/recipedetail/RecipeDetailYoutubeCard";
import RecordWriteImageCard from "../../components/myCookeep/record/RecordWriteImageCard";
import { MOCK_RECIPES } from "../../constants/mockRecipes";
import RecipeRecordContentSection from "../../components/myCookeep/record/RecipeRecordContentSection";
import privateIcon from "../../assets/mycookeep/record/private_icon.svg";
import publicIcon from "../../assets/mycookeep/record/public_icon.svg";
import UploadCompleteModal from "../../components/myCookeep/record/UploadCompleteModal";
import { useCookeepsStore } from "../../stores/useCookeepsStore";
import { getKoreaToday } from "../../utils/date";
import { setTodayRecord } from "../../utils/record";

export default function RecordWritePage() {
  const navigate = useNavigate();

  const {
    selectedRecipeId,
    editingRecordId,
    title,
    memo,
    images,
    isPublic,
    records,
    setTitle,
    setMemo,
    setIsPublic,
    addImages,
    addRecord,
    updateRecordContent,
    resetRecord,
  } = useCookeepRecordStore();

  const recipe = useMemo(
    () => MOCK_RECIPES.find((r) => r.id === selectedRecipeId),
    [selectedRecipeId],
  );

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [showUploadModal, setShowUploadModal] = useState(false);

  /* ---------- 수정 모드 초기화 ---------- */
  useEffect(() => {
    if (!editingRecordId) return;

    const record = records.find((r) => r.id === editingRecordId);
    if (!record) return;

    setTitle(record.recipeTitle);
    setMemo(record.memo);
    setIsPublic(record.isPublic);
  }, [editingRecordId, records, setTitle, setMemo, setIsPublic]);

  // 메모
  const handleMemoInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const el = e.currentTarget;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  };

  // 신규 진입 시
  useEffect(() => {
    if (!editingRecordId && recipe) {
      setTitle(recipe.recipeName);
    }
  }, [editingRecordId, recipe, setTitle]);

  /* ---------- 가드 ---------- */
  useEffect(() => {
    if (showUploadModal) return; // 업로드 완료 후엔 가드 비활성

    if (!selectedRecipeId && !editingRecordId) {
      navigate("/mycookeep/record/select", { replace: true });
    }
  }, [selectedRecipeId, editingRecordId, showUploadModal, navigate]);

  /* ---------- 업로드 ---------- */
  const handleUpload = () => {
    if (selectedRecipeId === null || isPublic === null) return;

    if (!editingRecordId && recipe) {
      addRecord({
        id: crypto.randomUUID(),
        recipeId: recipe.id,
        recipeTitle: title || recipe.recipeName,
        memo,
        images,
        createdAt: getKoreaToday(), // 오늘날짜 핵심
        isPublic,
        recipeContent: {
          ingredients: recipe.ingredients,
          substitutions: recipe.substitutions,
          steps: recipe.steps,
        },
        tags: recipe.tags,
        relatedVideos: recipe.relatedVideos,
      });
      setTodayRecord();
    }

    setShowUploadModal(true);
  };

  // 쿠키추가
  const addCookie = useCookeepsStore((state) => state.addCookie);

  if (!recipe) return null;
  if (selectedRecipeId === null) return null;

  return (
    <>
      <div className="min-h-screen w-full flex flex-col ">
        <BackHeader title="레시피 선택" onBack={() => navigate(-1)} />

        <div className="flex-1 mx-auto w-full max-w-[450px] px-4 flex flex-col">
          <div className="pt-[51px] flex flex-col gap-[10px]">
            {/* 이미지 (업로드 모드로 나중에 확장) */}
            <RecordWriteImageCard
              title={title}
              imageSrc={images[0]?.url}
              onClickAddImage={() => fileInputRef.current?.click()}
              onChangeTitle={setTitle}
            />

            <input
              type="file"
              accept="image/*"
              multiple
              ref={fileInputRef}
              hidden
              onChange={(e) => {
                if (!e.target.files) return;
                addImages(Array.from(e.target.files));
              }}
            />

            {/* 레시피 내용 (읽기 전용) */}
            <RecipeRecordContentSection recipe={recipe} />

            {/* 유튜브 영상 (읽기 전용) */}
            {recipe.relatedVideos && (
              <RecipeDetailYoutube
                videos={recipe.relatedVideos}
                tags={recipe.tags}
              />
            )}
          </div>

          {/* 메모 */}
          <div className="flex w-full flex-col items-center pt-4">
            <textarea
              value={memo}
              onChange={(e) => setMemo(e.target.value.slice(0, 500))}
              onInput={handleMemoInput}
              placeholder="글자 수 최대 500자"
              className="
    w-full
    rounded-[10px]
    bg-white
    px-[10px]
    py-3
    text-center
    typo-body
    text-[#202020]
    placeholder:text-[#7D7D7D]
    resize-none
    outline-none
    overflow-hidden
  "
              rows={1}
            />
          </div>

          <div className="relative mt-[15px] flex justify-center animate-float-bubble">
            {/* 말풍선 본체 */}
            <div
              className="
      relative
      z-10
      inline-flex
      items-center
      px-[16px]
      py-[9px]
      rounded-[3px]
      bg-white
      text-[#32E389]
      text-[12px]
      font-medium
      shadow-[0_4px_16px_rgba(0,0,0,0.13)]
    "
              style={{ width: 206, height: 36 }}
            >
              AI 레시피에서 달라진 부분이 있나요?
            </div>

            {/* 삼각형 (본체 뒤에 깔림) */}
            <div
              className="
      absolute
      top-0
      translate-y-[-50%]
      w-[12px]
      h-[12px]
      bg-white
      rotate-45
      z-0
    "
              style={{
                boxShadow: "0 4px 16px rgba(0,0,0,0.13)",
              }}
            />
          </div>

          {/* 하단 고정 영역 */}
          <div className="mt-auto pt-[64px] pb-[34px] flex flex-col gap-4 items-center">
            {/* 공개 여부 */}
            <div className="flex justify-center gap-[9px] w-full">
              {/* 나만 보기 */}
              <button
                onClick={() => setIsPublic(false)}
                className={`
          flex h-[44px] w-[161px] items-center gap-[10px] rounded-full p-1
          ${isPublic === false ? "bg-[#96E8BE]" : "bg-[#EBEBEB]"}
        `}
              >
                <div className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-white">
                  <img
                    src={privateIcon}
                    alt="private"
                    className="h-[24px] w-[24px]"
                  />
                </div>
                <span className="typo-label text-[#202020]">나만 보기</span>
              </button>

              {/* 공개 */}
              <button
                onClick={() => setIsPublic(true)}
                className={`
          flex h-[44px] w-[161px] items-center gap-[10px] rounded-full p-1
          ${isPublic === true ? "bg-[#96E8BE]" : "bg-[#EBEBEB]"}
        `}
              >
                <div className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-white">
                  <img
                    src={publicIcon}
                    alt="public"
                    className="h-[36px] w-[36px]"
                  />
                </div>
                <span className="typo-label text-[#202020]">
                  쿠킵스에 공개하기
                </span>
              </button>
            </div>

            {/* 업로드 버튼 */}
            <Button
              size="L"
              variant="black"
              disabled={isPublic === null}
              className={`${isPublic === null ? "text-white" : "!text-[#32E389]"}`}
              onClick={handleUpload}
            >
              레시피 업로드하기
            </Button>
          </div>
        </div>
      </div>
      {showUploadModal && (
        <UploadCompleteModal
          onConfirm={() => {
            if (editingRecordId) {
              updateRecordContent({
                recordId: editingRecordId,
                memo,
                images,
                isPublic,
              });
            } else {
              // 신규 등록일 때만 쿠키 증가
              addCookie();
            }

            navigate("/mycookeep");
            resetRecord(); // setTimeout 필요 없음
          }}
          onCancel={() => setShowUploadModal(false)}
        />
      )}
    </>
  );
}
