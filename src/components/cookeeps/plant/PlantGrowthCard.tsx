import WaterButton from "./WaterButton";
import RefreshIcon from "../../../assets/cookeeps/main/refresh_cookeeps.svg";
import { useCookeepsStore } from "../../../stores/useCookeepsStore";
import GrowthProgressBar from "./GrowthProgressBar";
import { PLANT_NAME_KR } from "../../../constants/plantNames";
import { useEffect } from "react";

interface PlantGrowthCardProps {
  onWaterSuccess?: () => void; // 여기에 onSuccess 콜백 추가
  overridePlantStage?: number; // 추가
}

export default function PlantGrowthCard({
  onWaterSuccess,
  overridePlantStage,
}: PlantGrowthCardProps) {
  const { selectedPlant, grownPlants, lastRefreshedAt, refreshGrowth } =
    useCookeepsStore();

  const lastPlantName = grownPlants[grownPlants.length - 1];

  const plantKey = selectedPlant ?? lastPlantName ?? null;

  const plantName = plantKey ? PLANT_NAME_KR[plantKey] : "-";

  // 페이지 진입시 자동 새로고침
  useEffect(() => {
    refreshGrowth();
  }, [refreshGrowth]);

  //  분 단위 자동 새로고침 (정책서 충족)
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     refreshGrowth();
  //   }, 60 * 1000); // 1분

  //   return () => clearInterval(interval);
  // }, []);

  const date = lastRefreshedAt ?? new Date();

  const dateText = `${date.getMonth() + 1}월 ${date.getDate()}일 ${date
    .getHours()
    .toString()
    .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;

  return (
    //  배경과 16px만 겹침
    <div className="-mt-[16px] flex justify-center px-4">
      {/* 카드 기준 */}
      <div className="relative w-full max-w-[450px]">
        {/* 플로팅 WaterButton */}
        <div className="absolute -top-[20px] left-1/2 -translate-x-1/2 z-10">
          <WaterButton
            onSuccess={() => {
              onWaterSuccess?.(); // 부모용
              refreshGrowth(); // 정책용
            }}
          />
        </div>

        {/* 카드 본체 */}
        <div className="bg-white rounded-xl shadow px-[22px] pt-[32px] pb-[14px]">
          <div className="flex flex-col items-center gap-[11px] max-w-[360px] mx-auto">
            {/* 식물 이름 / 날짜 / 새로고침 */}
            <div className="flex justify-between items-center w-full">
              <div className="flex items-end gap-2">
                <span className="text-[18px] font-semibold text-[#202020]">
                  {plantName}
                </span>
                <span className="text-xs text-[#7D7D7D] mb-[2px]">
                  {dateText} 기준
                </span>
              </div>

              <button onClick={refreshGrowth}>
                <img src={RefreshIcon} alt="새로고침" className="w-4 h-4" />
              </button>
            </div>

            <GrowthProgressBar overridePlantStage={overridePlantStage} />
          </div>
        </div>
      </div>
    </div>
  );
}
