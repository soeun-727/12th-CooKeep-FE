// src/components/myCookeep/record/AddRecordButton.tsx
import { useNavigate } from "react-router-dom";
// import { useState } from "react";
import plusIcon from "../../../assets/fridge/items/plus.svg";
import { useCookeepRecordStore } from "../../../stores/useCookeepRecordStore";

export default function AddRecordButton() {
  const navigate = useNavigate();
  //   const [pressed, setPressed] = useState(false);
  const resetRecord = useCookeepRecordStore((s) => s.resetRecord);

  return (
    <button
      onClick={() => {
        resetRecord();
        navigate("/mycookeep/record/select");
      }}
      //   onTouchStart={() => setPressed(true)}
      //   onTouchEnd={() => setPressed(false)}
      className="
        absolute bottom-29 right-[calc(50%-180px)] z-40
        w-12 h-12
        rounded-full
        bg-[#202020]
        flex items-center justify-center
        transition-all
        active:scale-95
        shadow-[0_1px_8.2px_rgba(17,17,17,0.25)]
      "
    >
      <img
        src={plusIcon}
        alt="메뉴 추가"
        className="
          w-[20px] h-[20px]
          stroke-[#33E389]
        "
      />
    </button>
  );
}
