import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackHeader from "../../components/ui/BackHeader";
import Button from "../../components/ui/Button";
import { useCookeepRecordStore } from "../../stores/useCookeepRecordStore";
import RecordWriteImageCard from "../../components/myCookeep/record/RecordWriteImageCard";
import RecipeRecordContentSection from "../../components/myCookeep/record/RecipeRecordContentSection";
import privateIcon from "../../assets/mycookeep/record/private_icon.svg";
import publicIcon from "../../assets/mycookeep/record/public_icon.svg";
import UploadCompleteModal from "../../components/myCookeep/record/UploadCompleteModal";
import { useCookeepsStore } from "../../stores/useCookeepsStore";
import { uploadImage } from "../../api/image";
import { createDailyRecipe } from "../../api/myRecipe";
import { AiRecipeDetail, getAiRecipeDetail } from "../../api/dailyAiRecipe";

export default function RecordWritePage() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [recipeDetail, setRecipeDetail] = useState<AiRecipeDetail | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const {
    selectedRecipeId,
    editingRecordId,
    title,
    memo,
    images,
    isPublic,
    setTitle,
    setMemo,
    setIsPublic,
    addImages,
    resetRecord,
  } = useCookeepRecordStore();

  useEffect(() => {
    if (!selectedRecipeId) return;

    const fetchDetail = async () => {
      try {
        const response = await getAiRecipeDetail(selectedRecipeId);
        if (response.status === "OK") {
          setRecipeDetail(response.data);

          // 신규 진입 시 서버에서 온 제목으로 초기화
          if (!title) {
            setTitle(response.data.title);
          }
        }
      } catch (error) {
        console.error("레시피 상세 로드 실패", error);
      }
    };

    fetchDetail();
  }, [selectedRecipeId, setTitle, title]);

  // 가드 로직
  useEffect(() => {
    if (showUploadModal) return;
    if (!selectedRecipeId && !editingRecordId) {
      navigate("/mycookeep/record/select", { replace: true });
    }
  }, [selectedRecipeId, editingRecordId, showUploadModal, navigate]);

  const handleMemoInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const el = e.currentTarget;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  };

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

  /* ---------- 업로드 로직 ---------- */
  const handleUpload = async () => {
    if (!recipeDetail || selectedRecipeId === null || isPublic === null) {
      alert("레시피 정보가 로드되지 않았습니다.");
      return;
    }
    setIsUploading(true); // 로딩 시작
    try {
      const requestData = {
        aiRecipeId: selectedRecipeId,
        isPublic: isPublic,
        title: title || recipeDetail.title,
        description: memo,
        recipeImageUrl: images[0]?.url || "",
      };
      console.log("전송 데이터:", requestData); // 데이터 확인용
      const response = await createDailyRecipe(requestData);
      console.log("서버 응답:", response); // 응답 구조 확인용
      if (response && (response.status === "OK" || response.data)) {
        setShowUploadModal(true);
      } else {
        throw new Error("응답 형식이 올바르지 않습니다.");
      }
    } catch (error: any) {
      console.error("업로드 상세 에러:", error);
      const errorMsg =
        error.response?.data?.message || "레시피 등록에 실패했습니다.";
      alert(errorMsg);
    } finally {
      setIsUploading(false); // 로딩 종료
    }
  };
  if (!recipeDetail) {
    return (
      // 임시로 넣은 로딩 화면
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#32E389]"></div>
      </div>
    );
  }
  return (
    <>
      <div className="min-h-screen w-full flex flex-col ">
        <BackHeader title="레시피 선택" onBack={() => navigate(-1)} />

        <div className="flex-1 mx-auto w-full max-w-[450px] px-4 flex flex-col">
          <div className="pt-[51px] flex flex-col gap-[10px]">
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
            <RecipeRecordContentSection
              recipe={{
                ingredients: recipeDetail.ingredientsJson,
                steps: recipeDetail.stepsJson,
              }}
            />
          </div>

          <div className="flex w-full flex-col items-center pt-4">
            <textarea
              value={memo}
              onChange={(e) => setMemo(e.target.value.slice(0, 500))}
              onInput={handleMemoInput}
              placeholder="글자 수 최대 500자"
              className="w-full rounded-[10px] bg-white px-[10px] py-3 text-center typo-body text-[#202020] placeholder:text-[#7D7D7D] resize-none outline-none overflow-hidden"
              rows={1}
            />
          </div>

          <div className="relative mt-[15px] flex justify-center animate-float-bubble">
            <div
              className="relative z-10 inline-flex items-center px-[16px] py-[9px] rounded-[3px] bg-white text-[#32E389] text-[12px] font-medium shadow-[0_4px_16px_rgba(0,0,0,0.13)]"
              style={{ width: 206, height: 36 }}
            >
              AI 레시피에서 달라진 부분이 있나요?
            </div>
            <div
              className="absolute top-0 translate-y-[-50%] w-[12px] h-[12px] bg-white rotate-45 z-0"
              style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.13)" }}
            />
          </div>

          <div className="mt-auto pt-[64px] pb-[34px] flex flex-col gap-4 items-center">
            <div className="flex justify-center gap-[9px] w-full">
              <button
                onClick={() => setIsPublic(false)}
                className={`flex h-[44px] w-[161px] items-center gap-[10px] rounded-full p-1 ${isPublic === false ? "bg-[#96E8BE]" : "bg-[#EBEBEB]"}`}
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

              <button
                onClick={() => setIsPublic(true)}
                className={`flex h-[44px] w-[161px] items-center gap-[10px] rounded-full p-1 ${isPublic === true ? "bg-[#96E8BE]" : "bg-[#EBEBEB]"}`}
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
        <UploadCompleteModal
          isOpen={showUploadModal} // isOpen 전달
          onConfirm={async () => {
            await useCookeepsStore.getState().fetchCookies();
            resetRecord();
            navigate("/mycookeep");
          }}
          onCancel={() => setShowUploadModal(false)}
          closeOnOverlayClick={false} // 필요에 따라 설정
        />
      )}
    </>
  );
}
