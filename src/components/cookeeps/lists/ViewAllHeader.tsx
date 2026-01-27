// src/components/headers/ViewAllHeader.tsx

import { searchIcon } from "../../../assets";
import TextField from "../../ui/TextField";
import SortAll from "./SortAll";

interface Props {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  sortOrder: string;
  onSortChange: (value: string) => void;
}

export default function ViewAllHeader({
  searchTerm,
  onSearchChange,
  sortOrder,
  onSortChange,
}: Props) {
  const today = new Date();
  const weekNumber = Math.ceil(today.getDate() / 7);
  const dateText = `${today.getMonth() + 1}월 ${weekNumber}주차`;

  return (
    <div className="flex flex-col items-center flex-shrink-0">
      {/* 검색창 */}
      <div
        className={`mt-12 !w-[361px] [&_p]:hidden
          [&_input]:border-none [&_input]:focus:outline-none
          [&_input::placeholder]:text-zinc-500
          shadow-[0_4px_16px_-10px_rgba(0,0,0,0.25)]
          ${searchTerm ? "[&_input]:bg-white" : "[&_input]:bg-[#EBEDF1]"}`}
      >
        <TextField
          value={searchTerm}
          placeholder="찾으시는 레시피가 있나요?"
          onChange={(e: any) => {
            const value = e.target ? e.target.value : e;
            onSearchChange(value);
          }}
          rightIcon={<img src={searchIcon} />}
        />
      </div>

      {/* 날짜 + 정렬 */}
      <div className="w-[361px] relative flex items-center justify-center mt-[29px]">
        <div className="w-[133px] h-8 rounded-[6px] py-[2px] px-2 flex gap-1 bg-black items-center justify-center">
          <span className="typo-caption text-(--color-green)">{dateText}</span>
          <span className="typo-caption text-white">쿠킵이 레시피</span>
        </div>

        <div className="absolute right-0 flex items-center">
          <SortAll currentOrder={sortOrder} onSortChange={onSortChange} />
        </div>
      </div>
    </div>
  );
}
