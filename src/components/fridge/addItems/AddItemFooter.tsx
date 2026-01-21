import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import RecentlyAdded from "./components/RecentlyAdded";
import Selected from "./components/Selected";
import { useAddIngredientStore } from "../../../stores/useAddIngredientStore";

export default function AddItemFooter() {
  const navigate = useNavigate();
  const { selectedItems, resetSelected } = useAddIngredientStore();

  const handleSubmit = () => {
    if (selectedItems.length === 0) return;
    navigate("/fridge/add-detail");
  };
  return (
    <div className="fixed bottom-[103px] left-1/2 -translate-x-1/2 z-50 flex flex-col items-center">
      <div className="mb-[-4px]">
        <RecentlyAdded />
      </div>
      <div className="relative z-20">
        <Selected />
      </div>
      <div className="flex gap-[6px] w-[300px] mt-[14px]">
        <div className="flex-1">
          <Button
            size="S"
            variant="black"
            onClick={resetSelected}
            className="!w-full"
          >
            선택 초기화
          </Button>
        </div>
        <div className="flex-1">
          <Button
            size="S"
            variant="green"
            onClick={handleSubmit}
            disabled={selectedItems.length === 0}
            className="!w-full"
          >
            재료 추가하기
          </Button>
        </div>
      </div>
    </div>
  );
}
