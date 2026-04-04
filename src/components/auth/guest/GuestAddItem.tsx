import { useState } from "react";
import header from "../../../assets/guest/add_header.svg";

export default function GuestAddItem() {
  const [isDimmed, setIsDimmed] = useState(false);
  return (
    <div className="w-full h-[100dvh]">
      {isDimmed && (
        <div
          className="fixed inset-0 z-10 bg-neutral-900/50 transition-opacity animate-fadeIn left-1/2 -translate-x-1/2 max-w-[450px] w-full"
          onClick={() => setIsDimmed(false)}
        />
      )}
      <div className="flex flex-col items-center">
        <img src={header} />
      </div>
    </div>
  );
}
