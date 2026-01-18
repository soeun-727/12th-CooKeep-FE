// src/components/fridge/FloatingAddButton.tsx
import { useNavigate } from "react-router-dom";
import { useIngredientStore } from "../../../stores/useIngredientStore";
import plusIcon from "../../../assets/fridge/items/plus.svg";

export default function AddButton() {
  const navigate = useNavigate();
  const { selectedIds } = useIngredientStore();

  if (selectedIds.length > 0) return null;

  return (
    <button
      onClick={() => navigate("/fridge/add")}
      className="
        fixed bottom-29 right-[calc(50%-190px)] z-40
        w-12 h-12 bg-white
        rounded-full flex items-center justify-center
        active:scale-95 transition-all
        shadow-[0_1px_8.2px_-2px_rgba(17,17,17,0.25)]
      "
    >
      <img src={plusIcon} alt="add" className="w-5 h-5" />
    </button>
  );
}
