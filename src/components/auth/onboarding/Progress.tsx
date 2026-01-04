import React from "react";

const Progress = ({ currentStep }) => {
  const totalSteps = 4;
  // 현재 단계를 백분율로 계산 (0% ~ 100%)
  const progressWidth = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="mt-[147px]">
      {/* 바 컨테이너 */}
      <div className="w-[361px] h-1 bg-gray-300 rounded-full overflow-hidden">
        {/* 실제 채워지는 게이지 */}
        <div
          className="h-full bg-[var(--color-green-deep)] transition-all duration-500 ease-out"
          style={{ width: `${progressWidth}%` }}
        />
      </div>
    </div>
  );
};

export default Progress;
