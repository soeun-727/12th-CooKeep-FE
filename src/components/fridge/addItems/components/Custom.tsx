import React, { useEffect, useRef, useState } from "react";
import { useAddIngredientStore } from "../../../../stores/useAddIngredientStore";
import editIcon from "../../../../assets/recipe/rename.svg";
interface CustomProps {
  isOpen: boolean;
  onClose: () => void;
  // 수정: 어떤 카테고리가 선택되었는지 ID를 인자로 넘겨줍니다.
  onConfirm: (categoryId: number) => void;
  categories: { id: number; name: string; image: string }[];
  confirmText?: string;
}

const Custom: React.FC<CustomProps> = ({
  isOpen,
  onClose,
  onConfirm,
  categories,
  confirmText = "추가",
}) => {
  const { searchTerm, setSearchTerm } = useAddIngredientStore();
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null,
  );
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (selectedCategoryId !== null) {
      onConfirm(selectedCategoryId);
      setSelectedCategoryId(null);
      setIsEditing(false);
      onClose();
    }
  };
  const finishEditing = () => {
    if (searchTerm.trim() === "") {
      setSearchTerm("이름 없음");
    }
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center bg-[#11111180]">
      <div className="absolute inset-0" onClick={onClose}></div>

      <div className="relative w-[280px] h-[316px] bg-white rounded-[10px] shadow-xl flex flex-col items-center px-7 py-[35px]">
        <div className="w-full flex items-center justify-center gap-1 mb-4">
          {isEditing ? (
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onBlur={finishEditing} // 포커스 잃으면 실행
              onKeyDown={(e) => {
                if (e.key === "Enter") finishEditing(); // 엔터 치면 실행
              }}
              className="typo-body1 w-[180px] text-center font-bold text-neutral-900 border-b border-zinc-300 outline-none"
            />
          ) : (
            <div className="flex items-center justify-center gap-1 group">
              <h2 className="typo-body1 max-w-[180px] text-center font-bold text-neutral-900 break-all truncate">
                '{searchTerm}'
              </h2>
              <button
                onClick={() => setIsEditing(true)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <img src={editIcon} alt="edit" className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>

        <p className="text-[12px] text-zinc-500 mb-4 leading-none">
          '{searchTerm}'의 카테고리를 선택해주세요
        </p>

        {/* 그리드 영역 */}
        <div className="w-40 h-40 flex-1 overflow-y-auto no-scrollbar grid grid-cols-3 gap-2 mb-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategoryId(cat.id)}
              className={`flex flex-col items-center pt-2 rounded-[6px] transition-all w-12 h-12 gap-[2px]
                ${
                  selectedCategoryId === cat.id
                    ? "bg-gray-100 ring-1 ring-inset ring-gray-300"
                    : "bg-white hover:bg-gray-50"
                }`}
            >
              <div className="w-[18px] flex items-center justify-center">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="object-contain"
                />
              </div>
              <span className="w-[26px] truncate text-[10px] whitespace-nowrap leading-none font-semibold text-zinc-500">
                {cat.name}
              </span>
            </button>
          ))}
        </div>

        <button
          onClick={handleConfirm}
          disabled={selectedCategoryId === null}
          className={`typo-label w-full h-11 text-white rounded-[10px] transition-colors
            ${selectedCategoryId !== null ? "bg-[var(--color-green-deep)]" : "bg-zinc-300 cursor-not-allowed"}`}
        >
          {confirmText}
        </button>
      </div>
    </div>
  );
};

export default Custom;
