import Search from "../search/Search";
import Storage from "./Storage";
import fridgeIcon from "../../../assets/fridge/fridge.svg";
import freezerIcon from "../../../assets/fridge/freezer.svg";
import pantryIcon from "../../../assets/fridge/pantry.svg";
import milk from "../../../assets/fridge/milk.svg";
import character from "../../../assets/fridge/character.svg";
import { useIngredientStore } from "../../../stores/useIngredientStore";
import ItemOption from "../items/ItemOption";
import Item from "../items/Item";
import { useEffect } from "react";

// 1. 임시 데이터 (현업에서는 API 응답 데이터가 됨)
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
  const { ingredients, setIngredients, searchTerm, selectedIds, toggleSelect } =
    useIngredientStore();
  useEffect(() => {
    if (ingredients.length === 0) {
      setIngredients(TEMP_DATA as any);
    }
  }, [ingredients.length, setIngredients]);

  const isSearching = searchTerm.trim().length > 0;
  const filteredIngredients = ingredients.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full flex flex-col transition-all">
      <Search />
      {isSearching ? (
        /* --- 검색 결과 뷰 --- */
        <div className="mx-auto w-[353px] grid grid-cols-3 gap-y-6 gap-x-[6px] mt-4">
          {filteredIngredients.length > 0 ? (
            filteredIngredients.map((item) => (
              <Item
                key={item.id}
                name={item.name}
                expiration={item.expiration}
                image={item.image}
                isSelected={selectedIds.includes(item.id)}
                onClick={() => toggleSelect(item.id)}
              />
            ))
          ) : (
            /* 검색 결과가 없을 때 */
            <div className="col-span-3 flex flex-col items-center py-20 text-[#7A8093] typo-caption">
              <img src={character} className="w-[90px] mt-[184px]" />
              <span className="typo-caption font-semibold text-[#7A8093]">
                검색 결과가 없어요
              </span>
            </div>
          )}
        </div>
      ) : (
        /* --- 기본 카테고리 뷰 --- */
        <div className="flex flex-col gap-[10px] w-full">
          <div className="h-[23px]" />
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
      )}
      <ItemOption />
    </div>
  );
}
