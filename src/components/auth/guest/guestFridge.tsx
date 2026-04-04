import header from "../../../assets/guest/fridge_header.svg";
import Storage from "../../fridge/main/Storage";
import fridgeIcon from "../../../assets/fridge/fridge.svg";
import freezerIcon from "../../../assets/fridge/freezer.svg";
import pantryIcon from "../../../assets/fridge/pantry.svg";

export default function GuestFridge() {
  return (
    <div className="flex flex-col w-full mt-[62px] gap-7">
      <img src={header} />
      <div className="flex flex-col gap-[10px] w-full">
        <Storage category="냉장" image={fridgeIcon} ingredients={[]} />
        <Storage category="냉동" image={freezerIcon} ingredients={[]} />
        <Storage category="상온" image={pantryIcon} ingredients={[]} />
      </div>
    </div>
  );
}
