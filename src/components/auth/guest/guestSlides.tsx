import React from "react";
import GuestFridge from "./GuestFridge";

// src/components/auth/guest/guestSlides.tsx
export interface GuestSlide {
  id: number;
  content: React.ReactNode;
  hasLoginButton?: boolean;
  isLast?: boolean;
}

export const guestSlides: GuestSlide[] = [
  { id: 1, content: <GuestFridge /> },
  // { id: 28, image: guest28, isLast: true, hasLoginButton: true },
];
