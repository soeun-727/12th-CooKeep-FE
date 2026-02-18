import { useNavigate } from "react-router-dom";
import { useAddIngredientStore } from "../../../stores/useAddIngredientStore";
import DetailedItem from "./DetailedItem";
import Button from "../../ui/Button";
import { addIngredientToFridge } from "../../../api/ingredient";
import { useState } from "react";

export default function Details() {
  const navigate = useNavigate();
  const { selectedItems, resetSelected } = useAddIngredientStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleComplete = async () => {
    if (selectedItems.length === 0 || isLoading) return;
    setIsLoading(true);

    try {
      const promises = selectedItems.map((item) => {
        const formattedDate = item.expiration.replace(/\./g, "-");
        const payload = {
          type: item.type,
          referenceId: Number(item.id),
          quantity: item.quantity,
          unit: item.unit,
          storage: item.storageType,
          expirationDate: formattedDate,
          memo: item.memo || "",
        };

        return addIngredientToFridge(payload);
      });

      await Promise.all(promises);
      resetSelected();
      navigate("/fridge");
    } catch (error: any) {
      console.error("등록 실패 상세 로그:", error.response?.data);
      const errorMessage =
        error.response?.data?.message || "데이터 형식을 확인해주세요.";
      alert(`등록 실패: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="relative flex flex-col items-center w-full h-[calc(100vh-34px)] bg-[#F8F8F8] pt-1">
        <div className="flex-1 overflow-y-auto no-scrollbar min-h-0">
          <div className="flex flex-col gap-[10px] overflow-y-auto no-scrollbar pb-10">
            {selectedItems.length > 0 ? (
              selectedItems.map((item) => (
                <DetailedItem key={item.id} {...item} />
              ))
            ) : (
              <div className="mt-20 flex flex-col items-center gap-4">
                <p className="text-zinc-400">선택된 재료가 없습니다.</p>
                <Button size="S" variant="black" onClick={() => navigate(-1)}>
                  재료 선택하러 가기
                </Button>
              </div>
            )}
          </div>
        </div>

        {selectedItems.length > 0 && (
          <div className="shrink-0 flex pb-[calc(113px+env(safe-area-inset-bottom))] justify-center z-50">
            <Button
              size="L"
              variant="black"
              onClick={handleComplete}
              disabled={isLoading}
            >
              등록 완료
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
