import { useState } from "react";
import TextField from "../../components/ui/TextField";
import { searchIcon } from "../../assets";
import AllItem from "../../components/cookeeps/lists/AllItem";
import { useRankStore } from "../../stores/useRankStore";
import SortAll from "../../components/cookeeps/lists/SortAll";

export default function ViewAllPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState("좋아요 많은 순");
  const { allRanks } = useRankStore();
  const bestData = [...allRanks].sort((a, b) => b.likes - a.likes);
  const filteredData = [...allRanks]
    .filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortOrder === "좋아요 많은 순") return b.likes - a.likes;
      if (sortOrder === "등록 최신 순") return b.id - a.id;
      if (sortOrder === "등록 오래된 순") return a.id - b.id;
      return 0;
    });
  const today = new Date();
  const weekNumber = Math.ceil(today.getDate() / 7);
  const dateText = `${today.getMonth() + 1}월 ${weekNumber}주차`;
  return (
    <div className="flex flex-col items-center h-full overflow-hidden">
      <div className="flex flex-col items-center flex-shrink-0">
        <div
          className={`mt-12 [&_p]:hidden !w-[361px] [&_input]:border-none [&_input]:focus:outline-none [&_input::placeholder]:text-zinc-500
                  shadow-[0_4px_16px_-10px_rgba(0,0,0,0.25)] ${
                    searchTerm ? "[&_input]:bg-white" : "[&_input]:bg-[#EBEDF1]"
                  }`}
        >
          <TextField
            value={searchTerm}
            placeholder="찾으시는 레시피가 있나요?"
            onChange={(e: any) => {
              const value = e.target ? e.target.value : e;
              setSearchTerm(value);
            }}
            rightIcon={<img src={searchIcon} className="" />}
          />
        </div>
        <div className="w-[361px] relative flex items-center justify-center mt-[29px]">
          <div className="w-[133px] h-8 rounded-[6px] py-[2px] px-2 flex gap-1 bg-black items-center justify-center">
            <span className="typo-caption text-(--color-green)">
              {dateText}{" "}
            </span>
            <span className="typo-caption text-white">쿠킵이 레시피</span>
          </div>
          <div className="absolute right-0 flex items-center">
            <SortAll currentOrder={sortOrder} onSortChange={setSortOrder} />
          </div>
        </div>
      </div>

      <div className="w-[361px] mt-[18px] flex-1 overflow-y-auto no-scrollbar pb-10 flex flex-col items-center">
        {filteredData.length > 0 ? (
          <div className="flex flex-col gap-3">
            {filteredData.map((item) => {
              const globalRank =
                bestData.findIndex((best) => best.id === item.id) + 1;

              return (
                <AllItem
                  key={item.id}
                  rank={globalRank} // index + 1 대신 계산된 globalRank를 전달
                  img={item.img}
                  title={item.title}
                  likes={item.likes}
                  isSelected={selectedId === item.id}
                  onSelect={() => setSelectedId(item.id)}
                />
              );
            })}
          </div>
        ) : (
          <p className="mt-10 text-zinc-400 typo-body text-center">
            검색 결과가 없습니다.
          </p>
        )}
      </div>
    </div>
  );
}
