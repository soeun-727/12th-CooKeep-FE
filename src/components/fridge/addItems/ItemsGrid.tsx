import Item from "./Item";
import milk from "../../../assets/fridge/milk.svg";
import character from "../../../assets/temp_simplelogin_icon.svg";

const DUMMY_ITEMS = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  name: "우유",
  image: milk,
}));

interface ItemsGridProps {
  selectedItems: any[];
  onSelect: (item: any) => void;
}

export default function ItemsGrid({ selectedItems, onSelect }: ItemsGridProps) {
  return (
    <div className="w-full flex flex-col items-justify-center pt-6">
      <div className="w-[294px] h-[482px] overflow-y-auto no-scrollbar scroll-smooth">
        <div className="grid grid-cols-3 gap-3 justify-items-center">
          {DUMMY_ITEMS.map((item) => (
            <Item
              key={item.id}
              name={item.name}
              image={item.image}
              isSelected={selectedItems.some((i) => i.id === item.id)}
              onSelect={() => onSelect(item)}
            />
          ))}
        </div>
        <div className="flex flex-col items-center gap-[10px] mt-4 mb-50">
          <img src={character} className="w-[50px]" />
          <button>
            <div className="flex flex-col items-justify-center rounded-full bg-black w-[125px] h-6">
              <span className="typo-caption text-white text-center py-1">
                찾는 재료가 없어요
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
