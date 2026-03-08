import { memo } from "react";
import { WateringRankItem } from "../../../api/cookeeps";
import RankingCard from "./RankingCard";

interface WeeklyTop3SectionProps {
  users: WateringRankItem[];
}

function WeeklyTop3Section({ users }: WeeklyTop3SectionProps) {
  const order = [1, 0, 2]; // 2-1-3 UI
  const currentMonth = new Date().getMonth() + 1;

  return (
    <div className="flex flex-col items-center gap-[26px] w-full min-h-[202px] py-5 rounded-[6px] bg-[#E6FBEB] shadow-md">
      <div className="flex flex-col items-center gap-[2px]">
        <h2 className="text-[18px] font-semibold text-gray-800 text-center">
          {currentMonth}월 식물 돌봄
          <span className="text-[#1FC16F]"> TOP3 </span>쿠킵이
        </h2>
      </div>

      <div className="flex gap-[10px]">
        {order.map((idx) => {
          const user = users[idx];

          // 데이터가 3개 미만일 경우를 대비한 가드
          if (!user) return <div key={`empty-${idx}`} className="w-[80px]" />;
          const isFirst = user.rank === 1;

          return (
            <RankingCard
              key={user.nickname}
              rank={user.rank}
              name={user.nickname || "쿠킵이"}
              plantImage={user.profileImageUrl}
              isFirst={isFirst}
              score={user.wateringCount}
            />
          );
        })}
      </div>
    </div>
  );
}

export default memo(WeeklyTop3Section);
