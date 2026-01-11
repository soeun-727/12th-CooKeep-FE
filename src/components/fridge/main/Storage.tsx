//Fridge, Freezer, Pantry items
import plus from "../../../assets/fridge/plus.svg";
import Item from "../items/Item";
import milk from "../../../assets/fridge/milk.svg";
import { useState } from "react";
interface Ingredient {
  //임시 데이터 구조
  id: number;
  name: string;
  expiration: string;
  image: string;
}
interface StorageProps {
  category: string;
  image: string;
}
export default function Storage({ category, image }: StorageProps) {
  const [ingredients] = useState<Ingredient[]>([
    //임시데이터
    { id: 1, name: "우유", expiration: "D-3", image: milk },
    { id: 2, name: "요거트", expiration: "D-5", image: milk },
    { id: 3, name: "치즈", expiration: "D-10", image: milk },
    { id: 4, name: "버터", expiration: "D-12345", image: milk },
    { id: 5, name: "초코우유", expiration: "D-1", image: milk },
  ]);
  //API 연동 시에는 id 받아오기
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const handleItemClick = (id: number) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };
  return (
    <div className="relative w-full max-w-[393px] min-h-[173px] mx-auto z-0">
      {/* 배경 */}
      <div className="absolute inset-0 -z-10 flex flex-col overflow-hidden">
        <div className="w-full h-[115px] rounded-t-[36px] bg-[#BFC6D740]" />
        <div className="bg-[#C8CFE2] h-12" />
        <div className="bg-[#ADB4C7] h-[10px]" />
      </div>

      {/* 헤더 */}
      <div className="relative z-10 pl-[22px] pr-[22px] pt-[5px] pb-5">
        <div className="flex justify-between w-full h-10 items-center">
          <div className="flex items-center bg-neutral-800 rounded-[6px] h-[22px] px-2 gap-1 text-white text-3">
            <img src={image} alt="" />
            <span>{category}</span>
          </div>

          <div className="flex items-center gap-1 h-10">
            <button>
              <span className="text-[var(--color-green-deep)] text-3 font-semibold leading-4">
                전체보기
              </span>
            </button>
            <button>
              <img src={plus} className="w-4 h-4" alt="plus" />
            </button>
          </div>
        </div>
      </div>

      {/* 아이템 */}
      <div className="relative w-[353px] z-10 mx-auto overflow-hidden">
        <div className="flex gap-[6px] overflow-x-auto">
          {ingredients.map((item) => (
            <div key={item.id} className="flex-shrink-0">
              <Item
                name={item.name}
                expiration={item.expiration}
                image={item.image}
                isSelected={selectedId === item.id}
                onClick={() => handleItemClick(item.id)}
              />
            </div>
          ))}
          <div className="w-4 flex-shrink-0" />
        </div>
      </div>
    </div>
  );
}
