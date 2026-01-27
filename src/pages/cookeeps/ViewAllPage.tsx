import { useOutletContext } from "react-router-dom";
import AllItem from "../../components/cookeeps/lists/AllItem";
import { useRankStore } from "../../stores/useRankStore";
import { useState } from "react";

export default function ViewAllPage() {
  const { searchTerm, sortOrder } = useOutletContext<{
    searchTerm: string;
    sortOrder: string;
  }>();

  const [selectedId, setSelectedId] = useState<number | null>(null);

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

  return (
    <div className="mt-[18px] pb-10 flex justify-center">
      <div className="w-[361px] items-center">
        {filteredData.length > 0 ? (
          <div className="flex flex-col gap-3 items-center">
            {filteredData.map((item) => {
              const globalRank =
                bestData.findIndex((best) => best.id === item.id) + 1;

              return (
                <AllItem
                  key={item.id}
                  rank={globalRank}
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
