import { useState, useRef, useEffect } from "react";
import sortIcon from "../../../assets/fridge/sort.svg";

interface SortProps {
  currentOrder: string;
  onSortChange: (order: string) => void;
}

export default function SortAll({ currentOrder, onSortChange }: SortProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const options = ["좋아요 많은 순", "등록 최신 순", "등록 오래된 순"];
  const menuRef = useRef<HTMLDivElement>(null);

  // 메뉴 외부 클릭 시 닫기 로직
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  return (
    <div className="relative flex items-center" ref={menuRef}>
      {/* 정렬 메뉴 모달 */}
      {isMenuOpen && (
        <div className="absolute right-[34px] bottom-0 flex flex-col items-center justify-center bg-white rounded-[10px] w-[123px] shadow-[0_4px_12px_rgba(0,0,0,0.15)] z-50 overflow-hidden animate-fadeIn">
          {options.map((option, index) => (
            <div key={option} className="flex flex-col items-center w-full">
              <button
                onClick={() => {
                  onSortChange(option);
                  setIsMenuOpen(false);
                }}
                className={`whitespace-nowrap w-full h-[36px] typo-caption !text-[10px] transition-colors hover:bg-zinc-50 ${
                  currentOrder === option
                    ? "font-bold text-black"
                    : "text-zinc-500"
                }`}
              >
                {option}
              </button>
              {index < options.length - 1 && (
                <div className="w-[105px] h-[0.5px] bg-[#D1D1D1]" />
              )}
            </div>
          ))}
        </div>
      )}

      {/* 정렬 아이콘 버튼 */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={`relative z-10 transition-transform active:scale-95 ${isMenuOpen ? "rotate-180" : ""}`}
      >
        <img src={sortIcon} className="w-[30px]" alt="sort" />
      </button>
    </div>
  );
}
