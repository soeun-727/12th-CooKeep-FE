import Item from "./Item";
import character from "../../../../assets/character/confused_char.svg";
import { useAddIngredientStore } from "../../../../stores/useAddIngredientStore";

interface ItemsGridProps {
  items: {
    id: number | string;
    name: string;
    image: string;
    categoryId: number;
  }[];
}

export default function ItemsGrid({ items }: ItemsGridProps) {
  const { selectedItems, toggleItem, setModalOpen, searchTerm } =
    useAddIngredientStore();
  const isSearchEmpty =
    searchTerm && searchTerm.trim().length > 0 && items.length === 0;

  return (
    <div className="w-full flex flex-col items-center justify-center pt-6">
      <div className="flex flex-col w-[294px] h-[482px] overflow-y-auto no-scrollbar scroll-smooth">
        <div className="grid grid-cols-3 gap-3 justify-items-center">
          {items.map((item) => (
            <Item
              key={item.id}
              name={item.name}
              image={item.image}
              isSelected={selectedItems.some(
                (i) => String(i.id) === String(item.id),
              )}
              onSelect={() => toggleItem(item)}
            />
          ))}
        </div>

        {isSearchEmpty && (
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="flex flex-col items-center justify-center gap-3 mt-30 mb-50 animate-fadeIn"
          >
            <img src={character} className="w-23" alt="no result" />
            <div className="bg-black rounded-[100px] h-6 py-1 px-[18px] flex justify-center items-center">
              <span className="typo-caption text-white text-center py-1">
                직접 재료 추가하기
              </span>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
