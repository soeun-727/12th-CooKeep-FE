import Item from "./Item";
import character from "../../../../assets/character/confused_char.svg";
import { useAddIngredientStore } from "../../../../stores/useAddIngredientStore";
import type { MasterItem } from "../../../../stores/useAddIngredientStore";
interface ItemsGridProps {
  items: MasterItem[];
}

export default function ItemsGrid({ items }: ItemsGridProps) {
  const { selectedItems, toggleItem, setModalOpen } = useAddIngredientStore();
  return (
    <div className="w-full flex flex-col items-center justify-center pt-6">
      <div className="flex flex-col w-[294px] h-[482px] overflow-y-auto no-scrollbar scroll-smooth">
        <div className="grid grid-cols-3 gap-3 justify-items-center">
          {items.map((item: MasterItem) => (
            <Item
              key={item.id}
              name={item.name}
              image={item.image}
              isSelected={selectedItems.some(
                (i) => String(i.id) === String(item.id),
              )}
              onSelect={() => toggleItem(item as MasterItem)}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="flex flex-col items-center justify-center gap-[10px] mt-4 mb-50"
        >
          <img src={character} className="w-[50px]" />
          <span className="typo-caption text-zinc-500 text-center py-1">
            검색 결과가 없어요
          </span>
        </button>
      </div>
    </div>
  );
}
