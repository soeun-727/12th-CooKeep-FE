import { useState } from "react";
import nextIcon from "../../../assets/fridge/addItem/forward.svg";
import prevIcon from "../../../assets/fridge/addItem/backward.svg";
import todaySign from "../../../assets/mycookeep/today.svg";

interface Props {
  records?: Record<string, string>;
  onDateClick: (date: string) => void;
}

export default function Calendar({ records = {}, onDateClick }: Props) {
  const [viewDate, setViewDate] = useState(new Date());
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const nowDate = new Date();

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));
  const monthName = viewDate.toLocaleString("en-US", { month: "long" });

  const getFormattedDate = (d: number) =>
    `${year}.${String(month + 1).padStart(2, "0")}.${String(d).padStart(
      2,
      "0",
    )}`;

  return (
    <div className="flex flex-col w-[357px] mx-auto items-center justify-center rounded-[6px] p-4 shadow-[0px_10px_60px_0px_rgba(0,0,0,0.1)] bg-white/10">
      {/* 1. 헤더 */}
      <div className="flex items-center justify-between w-full px-2 mt-[13px] mb-2">
        <h2 className="typo-h3 text-neutral-900">
          {monthName} {year}
        </h2>
        <div className="flex gap-1">
          <button onClick={prevMonth} className="p-2">
            <img src={prevIcon} className="w-4 h-4" alt="prev" />
          </button>
          <button onClick={nextMonth} className="p-2">
            <img src={nextIcon} className="w-4 h-4" alt="next" />
          </button>
        </div>
      </div>

      {/* 2. 요일 */}
      <div className="grid grid-cols-7 w-full mb-2">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="text-center typo-body2 text-(--color-green)"
          >
            {day}
          </div>
        ))}
      </div>

      {/* 3. 날짜 그리드 */}
      <div className="grid grid-cols-7 w-full relative gap-y-[6px] mb-[13px]">
        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const dateStr = getFormattedDate(day);
          const photo = records[dateStr];

          const isToday =
            nowDate.getFullYear() === year &&
            nowDate.getMonth() === month &&
            nowDate.getDate() === day;

          const prevDate = new Date(year, month, day - 1);
          const nextDate = new Date(year, month, day + 1);

          const prevKey = `${prevDate.getFullYear()}.${String(
            prevDate.getMonth() + 1,
          ).padStart(2, "0")}.${String(prevDate.getDate()).padStart(2, "0")}`;

          const nextKey = `${nextDate.getFullYear()}.${String(
            nextDate.getMonth() + 1,
          ).padStart(2, "0")}.${String(nextDate.getDate()).padStart(2, "0")}`;

          const hasPrev = !!records[prevKey];
          const hasNext = !!records[nextKey];
          const isContinuous = photo && (hasPrev || hasNext);

          return (
            <div key={dateStr} className="relative flex justify-center">
              {isToday && (
                <img
                  src={todaySign}
                  alt="today"
                  className="
                    absolute
                    -top-3
                    z-40
                    w-18
                    max-w-none
                    pointer-events-none
                    drop-shadow-md
                  "
                />
              )}

              {/* 연속 배경 */}
              {isContinuous && (
                <div
                  className={`
      absolute
      top-1/2
      -translate-y-1/2
      h-12
      bg-[#96E8BE]
      z-0
      ${hasPrev && hasNext ? "left-[-60%] right-[-60%] rounded-none" : ""}
      ${hasPrev && !hasNext ? "left-[-60%] right-[-2px] rounded-r-full" : ""}
      ${!hasPrev && hasNext ? "left-[-2px] right-[-60%] rounded-l-full" : ""}
      ${!hasPrev && !hasNext ? "w-10 rounded-full" : ""}
    `}
                />
              )}

              {/* 날짜 버튼 */}
              <button
                onClick={() => onDateClick(dateStr)}
                className={`
    relative
    z-10
    w-10
    h-10
    rounded-full
    flex
    items-center
    justify-center
    transition-all
    ${photo ? "shadow-md scale-105" : "hover:bg-zinc-50"}
  `}
              >
                {photo && (
                  <div className="absolute inset-0 rounded-full overflow-hidden">
                    <img
                      src={photo}
                      alt="record"
                      className="w-full h-full object-cover brightness-75"
                    />
                  </div>
                )}

                <span
                  className={`relative z-20 typo-h2 !font-normal ${
                    photo ? "text-white" : "text-neutral-800"
                  }`}
                >
                  {day}
                </span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
