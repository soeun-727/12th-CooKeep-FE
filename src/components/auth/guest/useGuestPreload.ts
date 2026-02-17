// src/components/auth/guest/useGuestPreload.ts

import { useEffect } from "react";
import { guestSlides } from "./guestSlides";

export const useGuestPreload = (index: number) => {
  useEffect(() => {
    const nextSlide = guestSlides[index + 1];

    if (nextSlide) {
      const img = new Image();
      img.src = nextSlide.image;
    }
  }, [index]);
};
