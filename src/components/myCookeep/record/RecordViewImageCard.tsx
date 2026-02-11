import { useEffect, useState } from "react";
import editIcon from "../../../assets/fridge/edit_memo.svg";
import foodIcon from "../../../assets/mycookeep/record/fork_knife_plate.svg";
import temp from "../../../assets/mycookeep/record/temp_food_photo.svg";

interface RecordViewImageCardProps {
  title: string;
  imageSrc?: string;
  onChangeTitle: (title: string) => void;
}

export default function RecordViewImageCard({
  title,
  imageSrc,
  onChangeTitle,
}: RecordViewImageCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [localTitle, setLocalTitle] = useState(title);

  const handleBlur = () => {
    setIsEditing(false);
    onChangeTitle(localTitle.trim() || title);
  };

  useEffect(() => {
    setLocalTitle(title);
  }, [title]);

  return (
    <div className="flex flex-col w-full max-w-[450px] mx-auto">
      {/* 이미지 */}
      <div
        className="
          w-full h-[153px]
          rounded-t-[6px]
          overflow-hidden
          shadow-[0_4px_16px_-10px_rgba(0,0,0,0.25)]
        "
      >
        <img
          src={imageSrc || temp}
          alt="요리 이미지"
          className="w-full h-full object-cover"
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
        </div>

        {/* 수정 아이콘 */}
        <img
          src={editIcon}
          alt="제목 수정"
          className="w-[18px] h-[18px] flex-shrink-0 cursor-pointer"
          onClick={() => setIsEditing(true)}
        />
      </div>
    </div>
  );
}
