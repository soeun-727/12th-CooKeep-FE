import { useRef, useState } from "react";
import foodIcon from "../../../assets/mycookeep/record/fork_knife_plate.svg";
import temp from "../../../assets/mycookeep/record/temp_food_photo.svg";

interface RecordViewImageCardProps {
  title: string;
  imageSrc?: string;
  isEditing: boolean;
  isImageUploading?: boolean;
  onChangeTitle: (title: string) => void;
  onImageFileSelect?: (file: File) => void; // 추가
  onImageDelete?: () => void; // 추가
}

export default function RecordViewImageCard({
  title,
  imageSrc,
  isEditing,
  isImageUploading,
  onChangeTitle,
  onImageFileSelect,
  onImageDelete,
}: RecordViewImageCardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showImageOptions, setShowImageOptions] = useState(false); // 추가

  return (
    <div className="flex flex-col w-full max-w-[450px] mx-auto">
      {/* 이미지 */}
      <div
        className="relative w-full h-[153px] rounded-t-[6px] overflow-hidden shadow-[0_4px_16px_-10px_rgba(0,0,0,0.25)] cursor-pointer"
        onClick={() => {
          if (!isEditing) return;
          if (imageSrc) {
            setShowImageOptions(true); // 이미지 있으면 옵션 표시
          } else {
            fileInputRef.current?.click(); // 이미지 없으면 바로 파일 선택
          }
        }}
      >
        <img
          src={imageSrc || temp}
          alt="요리 이미지"
          className="w-full h-full object-cover"
        />

        {/* 수정 모드일 때 카메라 힌트 아이콘 */}
        {/* {isEditing && !showImageOptions && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <span className="text-white text-[12px] font-medium">
              {imageSrc ? "사진을 탭해 변경/삭제" : "탭해서 사진 추가"}
            </span>
          </div>
        )} */}

        {/* 변경/삭제 옵션 오버레이 */}
        {isEditing && showImageOptions && (
          <div
            className="absolute inset-0 bg-black/50 flex items-center justify-center gap-8"
            onClick={(e) => e.stopPropagation()} // 옵션 클릭 시 부모 onClick 방지
          >
            <button
              type="button"
              disabled={isImageUploading}
              onClick={() => {
                setShowImageOptions(false);
                fileInputRef.current?.click();
              }}
              className="flex flex-col items-center gap-1 text-white"
            >
              {/* <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-2xl">
                📷
              </div> */}
              <span className="text-[12px] font-medium">사진 변경</span>
            </button>

            <button
              type="button"
              disabled={isImageUploading}
              onClick={() => {
                setShowImageOptions(false);
                onImageDelete?.();
              }}
              className="flex flex-col items-center gap-1 text-white"
            >
              {/* <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-2xl">
                🗑️
              </div> */}
              <span className="text-[12px] font-medium">사진 삭제</span>
            </button>

            {/* 닫기 버튼 */}
            <button
              type="button"
              onClick={() => setShowImageOptions(false)}
              className="absolute top-2 right-2 text-white text-xl"
            >
              ✕
            </button>
          </div>
        )}

        {/* 업로드 중 스피너 */}
        {isImageUploading && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white" />
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          hidden
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onImageFileSelect?.(file);
            e.target.value = "";
          }}
        />
      </div>

      {/* 제목 영역 */}
      <div
        className="
          flex items-center
          w-full
          bg-white
          rounded-b-[6px]
          shadow-[0_4px_16px_-10px_rgba(0,0,0,0.25)]
          px-3 py-[12px]
        "
      >
        {/* 왼쪽 아이콘 + 제목 */}
        <div className="flex items-center gap-[4px] flex-1 px-2">
          {/* 기본 아이콘 */}
          <img
            src={foodIcon}
            alt="요리 아이콘"
            className="w-[38px] h-[38px] flex-shrink-0"
          />

          {/* 제목 */}
          {isEditing ? (
            <input
              autoFocus
              value={title}
              onChange={(e) => onChangeTitle(e.target.value)}
              className="flex-1 text-[18px] font-semibold leading-[26px] outline-none border-b-2 border-primary"
              placeholder={title}
            />
          ) : (
            <h2 className="flex-1 text-[#202020] text-[18px] font-semibold leading-[26px]">
              {title}
            </h2>
          )}
        </div>
      </div>
    </div>
  );
}
