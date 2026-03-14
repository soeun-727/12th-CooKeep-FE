// src/pages/auth/GuestPage.tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { guestSlides } from "../../components/auth/guest/guestSlides";
import { useGuestPreload } from "../../components/auth/guest/useGuestPreload";

export default function GuestPage() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  useGuestPreload(index);

  const currentSlide = guestSlides[index];

  const handleNext = () => {
    if (currentSlide.isLast) {
      navigate("/");
    } else {
      setIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="relative w-screen h-dvh bg-[#474747] overflow-hidden">
      <div
        className="absolute inset-0 flex items-center justify-center"
        onClick={handleNext}
      >
        <img
          src={currentSlide.image}
          alt={`guest-${currentSlide.id}`}
          className="w-full h-full object-contain"
          loading="eager"
          decoding="async"
        />
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          navigate("/");
        }}
        className="absolute top-5 right-4 z-20
               inline-flex px-[22px] py-[8px]
               items-center justify-center gap-[8px]
               rounded-full
               bg-[rgba(235,235,235,0.8)]
               text-[#7D7D7D]
               text-[14px]
               font-medium
               leading-[16px]"
      >
        메인으로 돌아가기
      </button>
    </div>
  );
}
