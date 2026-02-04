import { useState } from "react";
import { carIcon, elecIcon, treeIcon, triButton } from "../../../assets";
import CircleGraph from "./CircleGraph";

interface StatsData {
  graph1: {
    denominator_total_managed: number;
    numerator_total_consumed: number;
    percentage: number;
  };
  graph2: {
    denominator_expired_managed: number;
    numerator_expired_consumed: number;
    percentage: number;
  };
}

export default function Statistics() {
  const [isExpanded, setIsExpanded] = useState(false);
  const data: StatsData = {
    graph1: {
      denominator_total_managed: 20,
      numerator_total_consumed: 12,
      percentage: 60,
    },
    graph2: {
      denominator_expired_managed: 5,
      numerator_expired_consumed: 5,
      percentage: 100,
    },
  };

  return (
    <div className="h-[307px] w-full flex flex-col items-center bg-white overflow-hidden relative">
      <div
        className={`flex flex-col items-center w-full transition-transform duration-500 ease-in-out ${
          isExpanded ? "-translate-y-[200px]" : "translate-y-0"
        }`}
      >
        {/* [영역 1]: 기본 통계 화면 (기존 307px 높이를 유지해야 함) */}
        <div className="flex flex-col items-center w-full h-[307px] shrink-0">
          <div className="flex flex-col typo-caption text-white bg-black rounded-[6px] w-[157px] h-[26px] text-center justify-center mt-5">
            나의 식재료 소비 달성 현황
          </div>

          <div className="flex w-[272px] mt-6">
            {" "}
            {/* w-68 -> w-[272px]로 명시적 수정 */}
            <div className="flex flex-col gap-[6px] w-1/2 items-center justify-center">
              <CircleGraph percentage={data.graph1.percentage} />
              <span className="typo-caption !text-[10px] text-zinc-500 text-center leading-tight">
                (실제 소비 음식/
                <br />
                전체 음식) %
              </span>
            </div>
            <div className="flex flex-col gap-[6px] w-1/2 items-center justify-center">
              <CircleGraph percentage={data.graph2.percentage} />
              <span className="typo-caption !text-[10px] text-zinc-500 text-center leading-tight">
                (실제 소비 음식/
                <br />
                폐기 임박 음식) %
              </span>
            </div>
          </div>

          <div className="mt-[31px] typo-body2 text-center">
            유통기한 임박 식재료 3개를 요리하면
            <br />
            <span className="text-(--color-green) font-bold">0.8kg</span>의 CO₂
            배출을 줄일 수 있어요
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex flex-col mt-[6px] w-[62px] h-[29px] items-center justify-start focus:outline-none"
          >
            <img
              src={triButton}
              className="p-2 transition-transform duration-500 "
              alt="expand button"
            />
          </button>
        </div>

        {/* [영역 2]: 올라오면서 보여질 상세 화면 (애니메이션 컨테이너 '내부'로 이동) */}
        <div className="flex flex-col items-center w-full px-4 pt-4 shrink-0">
          <div className="flex gap-2 justify-center mb-6">
            <div className="flex flex-col items-center gap-[14px]">
              <img
                src={treeIcon}
                alt="tree"
                className="w-12 h-12 object-contain"
              />
              <div className="text-[10px] whitespace-nowrap rounded-[100px] px-3 py-1 bg-[#E6FBEB] text-[#1DAD64] font-medium">
                나무 0.03그루 심기
              </div>
            </div>
            <div className="flex flex-col items-center gap-[14px]">
              <img
                src={carIcon}
                alt="car"
                className="w-12 h-12 object-contain"
              />
              <div className="text-[10px] whitespace-nowrap rounded-[100px] px-3 py-1 bg-[#E6FBEB] text-[#1DAD64] font-medium">
                자동차 4km 미주행
              </div>
            </div>
            <div className="flex flex-col items-center gap-[14px]">
              <img
                src={elecIcon}
                alt="elec"
                className="w-12 h-12 object-contain"
              />
              <div className="text-[10px] whitespace-nowrap rounded-[100px] px-3 py-1 bg-[#E6FBEB] text-[#1DAD64] font-medium">
                자동차 4km 미주행
              </div>
            </div>
          </div>

          <span className="typo-caption text-zinc-400 text-[10px] text-center">
            국제 평균 식품 폐기물 탄소 배출 계수 기준 추정치
          </span>
        </div>
      </div>
    </div>
  );
}
