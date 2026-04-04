// src/pages/auth/GuestPage.tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { guestSlides } from "../../components/auth/guest/guestSlides";

export default function GuestPage() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  const currentSlide = guestSlides[index];

  const handleNext = () => {
    if (currentSlide.isLast) {
      navigate("/");
    } else {
      setIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="relative w-full h-dvh bg-[#FAFAFA] overflow-hidden">
      <div className="flex flex-col items-center w-full h-full">
        <div className="w-full flex justify-center">{currentSlide.content}</div>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          navigate("/");
        }}
        className="absolute top-5 right-4 z-20
               inline-flex
               items-center justify-center gap-[8px]
               rounded-full
               bg-[rgba(235,235,235,0.8)]
               text-[#7D7D7D]
               text-[14px]
               font-medium
               leading-[16px]
               py-2 px-[22px]
               "
      >
        메인으로 돌아가기
      </button>
    </div>
  );
}
