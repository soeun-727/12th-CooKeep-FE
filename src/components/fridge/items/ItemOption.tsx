import { useState } from "react";
import eaten from "../../../assets/fridge/eaten.svg";
import thrown from "../../../assets/fridge/thrown.svg";
import { useIngredientStore } from "../../../stores/useIngredientStore";
import DoublecheckModal from "../../ui/DoublecheckModal";
import AlertModal from "../../ui/AlertModal";

export default function ItemOption() {
  const { selectedIds, ingredients, deleteSelected } = useIngredientStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [modalType, setModalType] = useState<"eaten" | "thrown">("eaten");

  // 일단 추가 전체보기 화면에서는 선택 옵션 안뜨는 것 같아서 넣었는데 뜨는거면 지우면 될것같습니다.
  const { viewCategory } = useIngredientStore();
  if (viewCategory !== null) return null;
  //----------------------------------------------------
  if (selectedIds.length === 0 && !isModalOpen && !isAlertOpen) return null; // 선택된 이름들 계산
  const firstItemName =
    ingredients.find((item) => item.id === selectedIds[0])?.name || "재료";
  const modalTitle =
    selectedIds.length <= 1
      ? firstItemName
      : `${firstItemName} 외 ${selectedIds.length - 1}개`;
  const handleOpenModal = (type: "eaten" | "thrown") => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleConfirm = async () => {
    const type = modalType;
    setIsModalOpen(false);
    await deleteSelected(type);

    if (type === "eaten") {
      setTimeout(() => {
        setIsAlertOpen(true);
      }, 100);
    }
  };

  const innerShadow = "inset_0_1px_6.7px_0_rgba(17,17,17,0.2)";

  return (
    <>
      <div className="flex flex-col fixed bottom-[90px] left-1/2 -translate-x-1/2 z-40 w-full">
        <div className="flex bg-white border-[0.5px] border-[#D1D1D1] h-11">
          <button
            onClick={() => handleOpenModal("eaten")}
            className={`flex-1 active:bg-[var(--color-green-light)] active:shadow-[${innerShadow}] transition-all`}
          >
            <div className="flex gap-[3px] items-center justify-center h-11">
              <span className="typo-body2">다 먹었어요</span>
              <img src={eaten} className="w-4" alt="eaten" />
            </div>
          </button>
          <button
            onClick={() => handleOpenModal("thrown")}
            className={`flex-1 border-x-[0.5px] border-[#D1D1D1] active:bg-[var(--color-green-light)] active:shadow-[${innerShadow}] transition-all`}
          >
            <div className="flex gap-[3px] items-center justify-center h-11">
              <span className="typo-body2">버렸어요</span>
              <img src={thrown} className="w-4" alt="thrown" />
            </div>
          </button>

          <button
            onClick={() => console.log("레시피 추천 로직")}
            className={`flex-1 active:bg-[var(--color-green-light)] active:shadow-[${innerShadow}] transition-all`}
          >
            <div className="flex gap-[3px] items-center justify-center h-11 typo-body2">
              AI 레시피 추천받기
            </div>
          </button>
        </div>

        <div className="w-full h-[5px] bg-gradient-to-b from-[#737373]/80 to-[#D9D9D9]/80" />
      </div>

      <DoublecheckModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        title={modalTitle}
        description={
          modalType === "eaten"
            ? "섭취완료로 변경하시겠습니까?"
            : "재료를 삭제하시겠습니까?"
        }
      />
      <AlertModal isOpen={isAlertOpen} onClose={() => setIsAlertOpen(false)} />
    </>
  );
}
