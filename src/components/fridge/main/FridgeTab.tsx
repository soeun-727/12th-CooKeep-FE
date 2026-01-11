import Search from "../search/Search";
import Storage from "./Storage";
import fridgeIcon from "../../../assets/fridge/fridge.svg";
import freezerIcon from "../../../assets/fridge/freezer.svg";
import pantryIcon from "../../../assets/fridge/pantry.svg";

export default function FridgeTab() {
  return (
    <div>
      <Search />
      <div className="flex flex-col gap-[10px] items-center w-full">
        <Storage category="냉장" image={fridgeIcon} />
        <Storage category="냉동" image={freezerIcon} />
        <Storage category="상온" image={pantryIcon} />
      </div>
    </div>
  );
}
