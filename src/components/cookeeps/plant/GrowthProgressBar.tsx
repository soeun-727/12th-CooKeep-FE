import treeIcon from "../../../assets/cookeeps/main/tree_cookeeps.svg";
import { useCookeepsStore } from "../../../stores/useCookeepsStore";

export default function GrowthProgressBar() {
  const { plantStage, selectedPlant } = useCookeepsStore();

  // 🌱 선택 전이면 0%, 선택 후에만 단계 반영
  const percent = selectedPlant ? (plantStage / 4) * 100 : 0;

  return (
    <div className="w-full h-[34px] flex items-center">
      <div className="relative w-full h-[12px] bg-[#EBEBEB] rounded-full">
        {/* 진행 바 */}
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#32E389] to-[#1FBE6E]"
          style={{ width: `${percent}%` }}
        />

        {/* 핸들 */}
        <div
          className="absolute top-1/2 -translate-y-1/2 transition-all duration-300"
          style={{ left: `calc(${percent}% - 16px)` }}
        >
          <div className="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center">
            <img src={treeIcon} alt="tree" className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
