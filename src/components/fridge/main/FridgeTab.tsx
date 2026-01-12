import Search from "../search/Search";
import Storage from "./Storage";
import fridgeIcon from "../../../assets/fridge/fridge.svg";
import freezerIcon from "../../../assets/fridge/freezer.svg";
import pantryIcon from "../../../assets/fridge/pantry.svg";
import milk from "../../../assets/fridge/milk.svg";
import { useState } from "react";

export interface Ingredient {
  //임시 데이터 구조
  id: number;
  name: string;
  expiration: string;
  image: string;
  category: "냉장" | "냉동" | "상온";
}

export default function FridgeTab() {
  //임시 데이터
  const [allIngredients] = useState<Ingredient[]>([
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
  ]);
  return (
    <div className="w-full flex flex-col items-center">
      <Search />
      <div className="flex flex-col gap-[10px]">
        <Storage
          category="냉장"
          image={fridgeIcon}
          ingredients={allIngredients.filter(
            (item) => item.category === "냉장"
          )}
        />
        <Storage
          category="냉동"
          image={freezerIcon}
          ingredients={allIngredients.filter(
            (item) => item.category === "냉동"
          )}
        />
        <Storage
          category="상온"
          image={pantryIcon}
          ingredients={allIngredients.filter(
            (item) => item.category === "상온"
          )}
        />
      </div>
    </div>
  );
}
