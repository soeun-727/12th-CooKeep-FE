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
          type: item.type, // 이제 스토어에서 "DEFAULT"가 보장됨
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
      console.error("등록 실패:", error.response?.data);
      alert(
        `등록 실패: ${error.response?.data?.message || "데이터 형식을 확인해주세요."}`,
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="relative flex flex-col items-center w-full h-[calc(100vh-34px)] bg-[#F8F8F8] pt-1">
        <div className="flex flex-col gap-[10px] overflow-y-auto no-scrollbar pb-32">
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

        {selectedItems.length > 0 && (
          <div className="fixed bottom-[113px] left-1/2 -translate-x-1/2 z-50">
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
