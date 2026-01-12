import Search from "../search/Search";
import Storage from "./Storage";
import fridgeIcon from "../../../assets/fridge/fridge.svg";
import freezerIcon from "../../../assets/fridge/freezer.svg";
import pantryIcon from "../../../assets/fridge/pantry.svg";
import milk from "../../../assets/fridge/milk.svg";
import { useIngredientStore } from "../../../stores/useIngredientStore";
import ItemOption from "../items/ItemOption";
import { useEffect } from "react";

const TEMP_DATA = [
  { id: 1, name: "우유", expiration: "D-3", image: milk, category: "냉장" },
  {
    id: 2,
    name: "이름이정말로긴우유",
    expiration: "D-1",
    image: milk,
    category: "냉동",
  },
  { id: 3, name: "우유", expiration: "D-45", image: milk, category: "냉동" },
  { id: 4, name: "우유", expiration: "D-1", image: milk, category: "냉장" },
  { id: 5, name: "우유", expiration: "D-1", image: milk, category: "냉장" },
  { id: 6, name: "우유", expiration: "D-1", image: milk, category: "냉장" },
  { id: 7, name: "우유", expiration: "D-1", image: milk, category: "냉장" },
  { id: 8, name: "우유", expiration: "D-1", image: milk, category: "냉장" },
  { id: 9, name: "우유", expiration: "D-1", image: milk, category: "냉장" },
];

export default function FridgeTab() {
  const { ingredients, setIngredients } = useIngredientStore();
  useEffect(() => {
    if (ingredients.length === 0) {
      // @ts-ignore (임시 데이터 타입 매칭용)
      setIngredients(INITIAL_DATA);
    }
  }, []);

  return (
    <div className="w-full flex flex-col items-center pb-32">
      <Search />
      <div className="flex flex-col gap-[10px]">
        <Storage
          category="냉장"
          image={fridgeIcon}
          ingredients={ingredients.filter((item) => item.category === "냉장")}
        />
        <Storage
          category="냉동"
          image={freezerIcon}
          ingredients={ingredients.filter((item) => item.category === "냉동")}
        />
        <Storage
          category="상온"
          image={pantryIcon}
          ingredients={ingredients.filter((item) => item.category === "상온")}
        />
      </div>
      <ItemOption />
    </div>
  );
}
