import { useState } from "react";

interface Item {
  id: string | number;
  name: string;
  image: string;
}

interface RecentlyAddedProps {
  historyItems: Item[];
  onAdd: (item: Item) => void;
}

export default function RecentlyAdded({
  historyItems,
  onAdd,
}: RecentlyAddedProps) {
  const [isOpen, setIsOpen] = useState(false);
  const displayHistory = historyItems.slice(0, 6);
  const emptyCount = Math.max(0, 6 - displayHistory.length);
  const emptySlots = Array(emptyCount).fill(null);
  const allSlots = [...displayHistory, ...emptySlots];

  return (
    <div className="flex flex-col w-full">
      <div className="pl-[15px]">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-[139px] h-6 bg-white rounded-t-[15px] flex items-center justify-center gap-2 relative z-30 transition-colors"
        >
          <span
            className={`typo-caption transition-colors duration-300 ${
              isOpen ? "text-[var(--color-green-deep)]" : "text-zinc-500"
            }`}
          >
            최근 추가한 재료
          </span>
          <div
            className={`w-2 h-2 border-b-2 border-r-2 transition-all duration-300 ${
              isOpen
                ? "rotate-[225deg] translate-y-[2px] border-[var(--color-green-deep)]" // 열렸을 때 초록색
                : "rotate-45 -translate-y-[1px] border-zinc-500" // 닫혔을 때 회색
            }`}
          />
        </button>
      </div>

      {/* 2. 메뉴바 (361px 너비) */}
      <div
        className={`w-[361px] bg-white rounded-t-[10px] shadow-[0_-1px_100px_-4px_rgba(17,17,17,0.15)] overflow-hidden transition-all duration-300 ease-in-out relative z-20 ${
          isOpen
            ? "max-h-[100px] opacity-100 mt-0"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="px-5 py-3 flex items-center justify-between overflow-x-auto no-scrollbar">
          {allSlots.map((item, idx) => (
            <div
              key={item?.id || `history-empty-${idx}`}
              className="flex flex-col items-center w-[56px]" // 간격 확보를 위해 너비 고정
            >
              {item ? (
                <button
                  onClick={() => onAdd(item)}
                  className="flex flex-col items-center group active:scale-90 transition-transform"
                >
                  <div className="w-10 h-10 flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-7 h-7 object-contain"
                    />
                  </div>
                  <span className="text-[10px] truncate w-11 text-center">
                    {item.name}
                  </span>
                </button>
              ) : (
                <div className="w-10 h-10 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-gray-200 rounded-full" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
