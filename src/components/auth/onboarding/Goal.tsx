import { useState } from "react";

const goals = [
  { id: "cook", title: "주 n회 요리하기" },
  { id: "photo", title: "요리 사진 n번 기록하기" },
  { id: "expired", title: "유통기한 임박 재료 n개 사용하기" },
  { id: "like", title: "다른 사람들 레시피 구경하고 좋아요 n회 남기기" },
];

interface GoalProps {
  selectedGoal: { id: string; title: string };
  onSelect: (goal: { id: string; title: string }) => void;
}

export default function Goal({ selectedGoal, onSelect }: GoalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const currentGoalTitle = selectedGoal.title;

  return (
    <>
      <div className="w-[361px] mt-[46px]">
        <h1 className="typo-h1 !text-[22px]">
          이번 주 달성하고 싶은 목표를 세워보세요!
        </h1>
        <h3 className="typo-h3 text-gray-500">
          목표를 이룰 수 있도록 쿠킵이 도와줄게요
        </h3>
      </div>

      <div className="w-[361px] mt-[46px]">
        <div className="border rounded-md overflow-hidden border-[#D1D1D1] bg-white transition-all">
          {/* 클릭 영역: 아코디언 헤더 */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full h-[48px] px-5 flex items-center justify-between text-left"
          >
            <span className="typo-body2 text-black">{currentGoalTitle}</span>
            <svg
              className={`w-5 h-5 transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* 펼쳐지는 리스트 영역 */}
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              isOpen ? "max-h-[300px]" : "max-h-0"
            }`}
          >
            <div className="flex flex-col">
              {goals
                .filter((goal) => goal.id !== selectedGoal.id)
                .map((goal) => (
                  <button
                    key={goal.id}
                    onClick={() => {
                      // 내부 state가 아닌 부모의 onSelect 호출
                      onSelect({ id: goal.id, title: goal.title });
                      setIsOpen(false);
                    }}
                    className="w-full h-[48px] px-5 text-left typo-body2 bg-white hover:bg-gray-50 transition-colors text-gray-500"
                  >
                    {goal.title}
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
