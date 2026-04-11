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

  const getLabel = () => {
    if (currentOrder === "좋아요 많은 순") return "좋아요 순";
    if (currentOrder === "등록 최신 순") return "최신 순";
    if (currentOrder === "등록 오래된 순") return "오래된 순";
    return "최신 순";
  };

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
    <div className="relative" ref={menuRef}>
      {/* 메뉴 */}
      {isMenuOpen && (
        <div className="absolute bottom-[48px] right-0 flex flex-col bg-white rounded-[10px] w-[123px] shadow-[0_4px_12px_rgba(0,0,0,0.15)] overflow-hidden z-50">
          {options.map((option, index) => (
            <div key={option} className="flex flex-col items-center w-full">
              <button
                onClick={() => {
                  onSortChange(option);
                  setIsMenuOpen(false);
                }}
                className={`w-full h-[36px] text-[12px] ${
                  currentOrder === option
                    ? "font-semibold text-black"
                    : "text-[#7D7D7D]"
                }`}
              >
                {option.replace("등록 ", "")}
              </button>

              {index < options.length - 1 && (
                <div className="w-[105px] h-[0.5px] bg-[#D1D1D1]" />
              )}
            </div>
          ))}
        </div>
      )}

      {/* 피그마 버튼 */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="inline-flex items-center gap-[2px] px-[20px] py-[8px] rounded-full bg-white shadow-[0_-36px_30.6px_rgba(0,0,0,0.05)]"
      >
        <span className="text-[12px] text-[#7D7D7D] font-medium leading-[16px]">
          {getLabel()}
        </span>
        <img src={sortIcon} className="w-[16px] h-[16px]" />
      </button>
    </div>
  );
}
