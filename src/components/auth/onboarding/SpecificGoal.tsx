import { useState } from "react";

interface SpecificGoalProps {
  selectedGoal?: { id: string; title: string };
}

export default function SpecificGoal({
  selectedGoal = { id: "cook", title: "주 n회 요리하기" },
}: SpecificGoalProps) {
  const [count, setCount] = useState<string>("3");
  const [isError, setIsError] = useState<boolean>(false);
  const titleParts = selectedGoal.title.split("n");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      setCount(value);
      const numValue = parseInt(value, 10);
      if (value === "" || numValue < 1 || numValue > 10) {
        setIsError(true);
      } else {
        setIsError(false);
      }
    } else {
      setIsError(true);
    }
  };
  return (
    <>
      <div className="w-[361px] mt-[46px]">
        <h1 className="typo-h1">이번 주 목표부터 정해볼까요?</h1>
        <h3 className="typo-h3 text-gray-500">
          목표를 이룰 수 있도록 쿠킵이 도와줄게요
        </h3>
      </div>
      {/* 작성하는 부분 */}
      <div className="w-[361px] mt-[46px] flex flex-col items-start">
        <div
          className={`w-full h-12 px-3 flex items-center border rounded-md bg-white transition-all ${
            isError ? "border-red-500" : "border-[#D1D1D1]"
          }`}
        >
          <span className="typo-body2 whitespace-pre">{titleParts[0]}</span>
          <input
            type="text"
            inputMode="numeric"
            value={count}
            onChange={handleChange}
            placeholder="3"
            className={`typo-body2 font-bold underline outline-none bg-transparent w-10 text-center ${
              isError ? "text-red-500" : "text-green-500"
            }`}
          />
          <span className="typo-body2">{titleParts[1]}</span>
        </div>
        {isError && (
          <p className="text-red-500 text-[10px] mt-[5px] ml-3 animate-fadeIn">
            1~10 사이의 숫자로 입력해주세요
          </p>
        )}
      </div>
    </>
  );
}
