import type { User } from "../../../constants/mocktop3Users";
import RankingCard from "./RankingCard";

interface WeeklyTop3SectionProps {
  users: User[];
}

export default function WeeklyTop3Section({ users }: WeeklyTop3SectionProps) {
  const order = [1, 0, 2]; // 2-1-3 UI

  return (
    <div className="flex flex-col items-center gap-[26px] w-full p-[18px_20px] rounded-[6px] bg-[#E6FBEB] shadow-md">
      <div className="flex flex-col items-center gap-[2px]">
        <h2 className="text-[18px] font-semibold text-gray-800 text-center">
          이번 주 식물 돌봄 <span className="text-[#1FC16F]">TOP3</span> 쿠킵이
        </h2>
      </div>

      <div className="flex gap-[10px]">
        {order.map((idx) => {
          const user = users[idx];

          // 실제 순위
          const sortedUsers = [...users].sort(
            (a, b) => b.watering_count - a.watering_count,
          );
          const actualRank = sortedUsers.findIndex((u) => u.id === user.id) + 1;

          // 화면상 1등 스타일 적용
          const isFirst = actualRank === 1;

          return (
            <RankingCard
              key={user.id}
              rank={actualRank} // 왕관 표시 기준
              name={user.nickname}
              plantImage={user.plant_image}
              score={user.watering_count}
              isFirst={isFirst} // 가운데 카드만 스타일 적용
            />
          );
        })}
      </div>
    </div>
  );
}
