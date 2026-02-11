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
import { uploadImage } from "../../api/image";
import { createDailyRecipe } from "../../api/myRecipe";

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
  const handleUpload = async () => {
    if (!recipe || selectedRecipeId === null || isPublic === null) {
      alert("레시피 정보가 없습니다.");
      return;
    }
    try {
      let finalImageUrl = "";

      // 1. 이미지가 있다면 먼저 S3에 업로드하여 URL 획득
      if (images.length > 0 && images[0].file) {
        const uploadRes = await uploadImage(images[0].file);
        finalImageUrl = uploadRes.data.imageUrl; // 서버에서 준 S3 URL
      }

      // 2. 신규 등록일 경우 데일리 레시피 POST API 호출
      if (!editingRecordId) {
        const requestData = {
          aiRecipeId: selectedRecipeId,
          isPublic: isPublic,
          title: title || recipe.recipeName, // 유저 입력 없으면 기본 제목
          description: memo, // 한줄평
          recipeImageUrl: finalImageUrl,
        };

        const response = await createDailyRecipe(requestData);

        if (response.status === "OK") {
          // 등록 성공 시에만 모달 띄우기
          setShowUploadModal(true);
        }
      } else {
        // 3. 수정 모드일 경우 (나중에 수정 API 연동)
        // updateDailyRecipe(...) 호출
        setShowUploadModal(true);
      }
    } catch (error) {
      console.error("업로드 실패:", error);
      alert("레시피 등록에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const [isUploading, setIsUploading] = useState(false);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || isUploading) return;

    if (images.length + files.length > 2) {
      alert("이미지는 최대 2장까지 업로드 가능합니다.");
      return;
    }

    setIsUploading(true);
    try {
      const fileList = Array.from(files);
      const uploadPromises = fileList.map((file) => uploadImage(file));
      const responses = await Promise.all(uploadPromises);

      const newImages = responses.map((res) => ({
        url: res.data.imageUrl,
      }));

      addImages(newImages);
    } catch (error) {
      alert("이미지 업로드 중 오류가 발생했습니다.");
    } finally {
      setIsUploading(false);
      if (e.target) e.target.value = "";
    }
  };

  // 쿠키추가
  // const addCookie = useCookeepsStore((state) => state.addCookie);

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
              onChange={handleImageChange}
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
              disabled={isPublic === null || isUploading}
              className={`${isPublic === null ? "text-white" : "!text-[#32E389]"}`}
              onClick={handleUpload}
            >
              레시피 업로드하기
            </Button>
          </div>
        </div>
      </div>
      {showUploadModal && (
        // <UploadCompleteModal
        //   onConfirm={() => {
        //     if (editingRecordId) {
        //       updateRecordContent({
        //         recordId: editingRecordId,
        //         memo,
        //         images,
        //         isPublic,
        //       });
        //     } else {
        //       // 신규 등록일 때만 쿠키 증가
        //       addCookie();
        //     }

        //     navigate("/mycookeep");
        //     resetRecord(); // setTimeout 필요 없음
        //   }}
        //   onCancel={() => setShowUploadModal(false)}
        // />
        <UploadCompleteModal
          onConfirm={async () => {
            // 성공 후 이동 전처리
            await useCookeepsStore.getState().fetchCookies(); // 쿠키(식물) 데이터 갱신
            resetRecord(); // 작성 중이던 상태값 리셋
            navigate("/mycookeep"); // 메인으로 이동
          }}
          onCancel={() => setShowUploadModal(false)}
        />
      )}
    </>
  );
}
