import {
  useIngredientStore,
  type Ingredient,
} from "../../../stores/useIngredientStore";
import Item from "./Item";

export default function IngredientGrid({ items }: { items: Ingredient[] }) {
  const { selectedIds, toggleSelect } = useIngredientStore();

  return (
    <div className="mx-auto w-[353px] grid grid-cols-3 gap-y-2 gap-x-2">
      {items.map((item) => (
        <Item
          key={item.id}
          {...item}
          isSelected={selectedIds.includes(item.id)}
          onClick={() => toggleSelect(item.id)}
        />
      ))}
    </div>
  );
}
