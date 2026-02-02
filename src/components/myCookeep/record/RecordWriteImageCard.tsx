import { useState } from "react";
import tempFoodPhoto from "../../../assets/mycookeep/record/temp_food_photo.svg";
import editIcon from "../../../assets/fridge/edit_memo.svg";

interface RecordWriteImageCardProps {
  title: string;
  imageSrc?: string;
  onClickAddImage: () => void;
  onChangeTitle: (title: string) => void;
}

export default function RecordWriteImageCard({
  title,
  imageSrc,
  onClickAddImage,
  onChangeTitle,
}: RecordWriteImageCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [localTitle, setLocalTitle] = useState(title);

  const handleBlur = () => {
    setIsEditing(false);
    onChangeTitle(localTitle.trim() || title);
  };

  return (
    <div className="flex flex-col items-start w-full max-w-[450px] mx-auto">
      {/* 이미지 영역 */}
      <div
        onClick={onClickAddImage}
        className="
          w-full
          h-[153px]
          rounded-t-[6px]
          overflow-hidden
          shadow-[0_4px_16px_-10px_rgba(0,0,0,0.25)]
          cursor-pointer
        "
      >
        <img
          src={imageSrc || tempFoodPhoto}
          alt="레시피 이미지"
          className="w-full h-full object-cover"
        />
      </div>

      {/* 제목 영역 */}
      <div
        className="
          flex justify-center items-center self-stretch
          w-full
          bg-white
          rounded-b-[6px]
          shadow-[0_4px_16px_-10px_rgba(0,0,0,0.25)]
          px-3 py-[12px]
        "
      >
        <div className="flex w-full items-center gap-2 px-2">
          {/* 제목 */}
          {isEditing ? (
            <input
              autoFocus
              value={localTitle}
              onChange={(e) => setLocalTitle(e.target.value)}
              onBlur={handleBlur}
              onKeyDown={(e) => e.key === "Enter" && handleBlur()}
              className="
                flex-1
                text-[18px]
                font-semibold
                leading-[26px]
                outline-none
              "
            />
          ) : (
            <h2
              className="
                flex-1
                text-[#202020]
                text-[18px]
                font-semibold
                leading-[26px]
              "
            >
              {title}
            </h2>
          )}
          {/* 아이콘 */}
          <img
            src={editIcon}
            alt="제목 수정"
            className="w-[18px] h-[18px] flex-shrink-0 cursor-pointer"
            onClick={() => setIsEditing(true)}
          />
        </div>
      </div>
    </div>
  );
}
