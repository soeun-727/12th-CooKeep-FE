import { useNavigate } from "react-router-dom";
import { useAddIngredientStore } from "../../../stores/useAddIngredientStore";
import DetailedItem from "./DetailedItem";
import Button from "../../ui/Button";

export default function Details() {
  const navigate = useNavigate();
  const { selectedItems } = useAddIngredientStore();

  const handleComplete = () => {
    console.log("최종 등록 데이터:", selectedItems);
    navigate("/fridge");
  };

  return (
    <>
      <div className="relative flex flex-col items-center w-full h-[calc(100vh-148px)] bg-[#F8F8F8] pt-[70px]">
        <div className="flex flex-col mt-7 gap-[10px] overflow-y-auto no-scrollbar">
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

        {/* 3. 하단 고정 버튼 */}
        {selectedItems.length > 0 && (
          <div className="fixed bottom-[113px] left-1/2 -translate-x-1/2 z-50">
            <Button
              size="L"
              variant="black"
              className=""
              onClick={handleComplete}
            >
              등록 완료
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
