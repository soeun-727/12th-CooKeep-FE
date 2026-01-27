import React, { useState } from "react";
import { PLANT_DATA } from "../../../constants/plantData";
import Button from "../../ui/Button";

interface PlantSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (categoryId: number) => void;
}

const PlantSelectModal: React.FC<PlantSelectModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (selectedId) {
      onConfirm(selectedId);
    }
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center">
      {/* backdrop: 클릭 시 닫히도록 수정 */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* 모달 영역 */}
      <div className="relative gap-4 w-70 h-72 bg-white rounded-[10px] flex flex-col items-center pt-[35px] pb-[25px] px-7">
        <h2 className="typo-body">키우고 싶은 식재료를 선택해주세요</h2>

        {/* 그리드 영역 */}
        <div className="flex flex-col w-49 h-32 grid grid-cols-3 gap-2 justify-items-center">
          {PLANT_DATA.map((plant) => (
            <button
              key={plant.id}
              type="button"
              onClick={() => setSelectedId(plant.id)}
              className="flex flex-col items-center group transition-all"
            >
              {/* 아이콘 컨테이너 */}
              <div
                className={`relative w-[60px] h-[60px] flex flex-col items-center justify-center rounded-[6px] transition-all gap-[2px] overflow-hidden
                ${
                  selectedId === plant.id
                    ? "bg-(--color-green-light)"
                    : "bg-white group-hover:bg-gray-100"
                }`}
              >
                <img src={plant.img} alt={plant.text} className="w-12" />
                <span className="h-4 text-[10px] font-semibold text-zinc-500">
                  {plant.text}
                </span>
                {plant.isHarvested && (
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="flex items-center justify-center w-[43px] h-5 bg-(--color-green-light)/93 border-[0.5px] border-(--color-green-deep) rounded-[3px]">
                      <span className="text-(--color-green-deep) text-[10px] font-semibold leading-none">
                        수확완료
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* 확인 버튼 */}
        <Button
          variant="black"
          className="!w-[224px] !h-11"
          onClick={handleConfirm}
          disabled={!selectedId}
        >
          선택하기
        </Button>
      </div>
    </div>
  );
};

export default PlantSelectModal;

// 나중에 사용할 때 CookeepsPage에
// const [activeModal, setActiveModal] = useState<"select" | "selected" | null>(
//     "select",
//   );
//   const [selectedPlant, setSelectedPlant] = useState<
//     (typeof PLANT_DATA)[0] | null
//   >(null);

//   // 1단계 모달에서 식물 선택 후 '확인' 클릭 시 실행
//   const handleSelectConfirm = (id: number) => {
//     const plant = PLANT_DATA.find((p) => p.id === id);
//     if (plant) {
//       setSelectedPlant(plant);
//       setActiveModal("selected"); // 두 번째 확인 모달로 변경
//     }
//   };

//   const handleFinalStart = () => {
//     console.log(`${selectedPlant?.text} 키우기 시작!`);
//     setActiveModal(null); // 모든 모달 닫기
//   };
//   <AppLayout>
//       <PlantSelectModal
//         isOpen={activeModal === "select"}
//         onClose={() => setActiveModal(null)}
//         onConfirm={handleSelectConfirm}
//       />

//       {/* 2. 최종 확인 모달 */}
//       {selectedPlant && (
//         <SelectedModal
//           isOpen={activeModal === "selected"}
//           onClose={() => setActiveModal("select")} // '다시 고르기' 클릭 시 1단계로 회귀
//           plant={selectedPlant.text}
//           image={selectedPlant.img}
//           description={selectedPlant.description}
//           onConfirm={handleFinalStart}
//         />
//       )}
