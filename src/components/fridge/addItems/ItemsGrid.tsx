import Item from "./Item";
import milk from "../../../assets/fridge/milk.svg";
import character from "../../../assets/temp_simplelogin_icon.svg";

// 예시데이터가 별로 없으므로 이거 30번 렌더링
const DUMMY_ITEMS = [
  { id: 1, name: "우유", image: milk },
  { id: 1, name: "우유", image: milk },
  { id: 1, name: "우유", image: milk },
  { id: 1, name: "우유", image: milk },
  { id: 1, name: "우유", image: milk },
  { id: 1, name: "우유", image: milk },
  { id: 1, name: "우유", image: milk },
  { id: 1, name: "우유", image: milk },
  { id: 1, name: "우유", image: milk },
  { id: 1, name: "우유", image: milk },
  { id: 1, name: "우유", image: milk },
  { id: 1, name: "우유", image: milk },
  { id: 1, name: "우유", image: milk },
  { id: 1, name: "우유", image: milk },
  { id: 1, name: "우유", image: milk },
  { id: 1, name: "우유", image: milk },
  { id: 1, name: "우유", image: milk },
  { id: 1, name: "우유", image: milk },
  { id: 1, name: "우유", image: milk },
  { id: 1, name: "우유", image: milk },
  { id: 1, name: "우유", image: milk },
  { id: 1, name: "우유", image: milk },
  { id: 1, name: "우유", image: milk },
  { id: 1, name: "우유", image: milk },
];

export default function ItemsGrid() {
  return (
    <div className="w-full flex flex-col items-justify-center pt-6">
      <div className="w-[294px] h-[482px] overflow-y-auto no-scrollbar scroll-smooth">
        <div className="grid grid-cols-3 gap-3 justify-items-center">
          {DUMMY_ITEMS.map((item) => (
            <Item
              key={item.id}
              name={item.name}
              image={item.image}
              // isSelected, onSelect 등 추가 로직 연결 가능
            />
          ))}
        </div>
        <div className="flex flex-col items-center gap-[10px] mt-4 mb-50">
          <img src={character} className="w-[50px]" />
          <div className="flex flex-col items-justify-center rounded-full bg-black w-[125px] h-6">
            <span className="typo-caption text-white text-center py-1">
              찾는 재료가 없어요
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
