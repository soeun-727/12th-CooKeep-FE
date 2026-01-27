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

  /** 선택 없고, 어떤 모달도 안 열려 있으면 숨김 */
  if (selectedIds.length === 0 && !isModalOpen && !isAlertOpen) {
    return null;
  }

  /** 모달 제목 */
  const firstItemName =
    ingredients.find((item) => item.id === selectedIds[0])?.name ?? "재료";

  const modalTitle =
    selectedIds.length === 1
      ? firstItemName
      : `${firstItemName} 외 ${selectedIds.length - 1}개`;

  const handleOpenModal = (type: "eaten" | "thrown") => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleConfirm = async () => {
    const type = modalType;
    await deleteSelected(type);

    setIsModalOpen(false);

    if (type === "eaten") {
      setTimeout(() => setIsAlertOpen(true), 100);
    }
  };

  return (
    <>
      {/* 하단 옵션 바 */}
      <div className="fixed bottom-[90px] left-1/2 z-50 w-full max-w-[450px] -translate-x-1/2">
        <div className="flex h-11 bg-white border-[0.5px] border-[#D1D1D1]">
          <button
            onClick={() => handleOpenModal("eaten")}
            className="flex-1 transition-all active:bg-[var(--color-green-light)] active:shadow-[inset_0_1px_6.7px_0_rgba(17,17,17,0.2)]"
          >
            <div className="flex h-11 items-center justify-center gap-[3px]">
              <span className="typo-body2">다 먹었어요</span>
              <img src={eaten} className="w-4" alt="eaten" />
            </div>
          </button>

          <button
            onClick={() => handleOpenModal("thrown")}
            className="flex-1 border-x-[0.5px] border-[#D1D1D1] transition-all active:bg-[var(--color-green-light)] active:shadow-[inset_0_1px_6.7px_0_rgba(17,17,17,0.2)]"
          >
            <div className="flex h-11 items-center justify-center gap-[3px]">
              <span className="typo-body2">버렸어요</span>
              <img src={thrown} className="w-4" alt="thrown" />
            </div>
          </button>

          <button
            onClick={() => console.log("레시피 추천 로직")}
            className="flex-1 transition-all active:bg-[var(--color-green-light)] active:shadow-[inset_0_1px_6.7px_0_rgba(17,17,17,0.2)]"
          >
            <div className="flex h-11 items-center justify-center typo-body2">
              AI 레시피 추천받기
            </div>
          </button>
        </div>

        <div className="h-[5px] w-full bg-gradient-to-b from-[#737373]/80 to-[#D9D9D9]/80" />
      </div>

      {/* 확인 모달 */}
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

      {/* 알림 */}
      <AlertModal isOpen={isAlertOpen} onClose={() => setIsAlertOpen(false)} />
    </>
  );
}
