// src/components/auth/guest/guestSlides.ts

import guest1 from "../../../assets/guest/guest_step1.png";
import guest2 from "../../../assets/guest/guest_step2.png";
import guest3 from "../../../assets/guest/guest_step3.png";
import guest4 from "../../../assets/guest/guest_step4.png";
import guest5 from "../../../assets/guest/guest_step5.png";
import guest6 from "../../../assets/guest/guest_step6.png";
import guest7 from "../../../assets/guest/guest_step7.png";
import guest8 from "../../../assets/guest/guest_step8.png";
import guest9 from "../../../assets/guest/guest_step9.png";
import guest10 from "../../../assets/guest/guest_step10.png";
import guest11 from "../../../assets/guest/guest_step11.png";
import guest12 from "../../../assets/guest/guest_step12.png";
import guest13 from "../../../assets/guest/guest_step13.png";
import guest14 from "../../../assets/guest/guest_step14.png";
import guest15 from "../../../assets/guest/guest_step15.png";
import guest16 from "../../../assets/guest/guest_step16.png";
import guest17 from "../../../assets/guest/guest_step17.png";
import guest18 from "../../../assets/guest/guest_step18.png";
import guest19 from "../../../assets/guest/guest_step19.png";
import guest20 from "../../../assets/guest/guest_step20.png";
import guest21 from "../../../assets/guest/guest_step21.png";
import guest22 from "../../../assets/guest/guest_step22.png";
import guest23 from "../../../assets/guest/guest_step23.png";
import guest24 from "../../../assets/guest/guest_step24.png";
import guest25 from "../../../assets/guest/guest_step25.png";
import guest26 from "../../../assets/guest/guest_step26.png";
import guest27 from "../../../assets/guest/guest_step27.png";
import guest28 from "../../../assets/guest/guest_step28.png";

export interface GuestSlide {
  id: number;
  image: string;
  hasLoginButton?: boolean;
  isLast?: boolean;
}

export const guestSlides: GuestSlide[] = [
  { id: 1, image: guest1 },
  { id: 2, image: guest2 },
  { id: 3, image: guest3 },
  { id: 4, image: guest4 },
  { id: 5, image: guest5 },
  { id: 6, image: guest6 },
  { id: 7, image: guest7 },
  { id: 8, image: guest8 },
  { id: 9, image: guest9 },
  { id: 10, image: guest10 },
  { id: 11, image: guest11 },
  { id: 12, image: guest12 },
  { id: 13, image: guest13 },
  { id: 14, image: guest14 },
  { id: 15, image: guest15 },
  { id: 16, image: guest16 },
  { id: 17, image: guest17 },
  { id: 18, image: guest18 },
  { id: 19, image: guest19 },
  { id: 20, image: guest20 },
  { id: 21, image: guest21 },
  { id: 22, image: guest22 },
  { id: 23, image: guest23 },
  { id: 24, image: guest24 },
  { id: 25, image: guest25 },
  { id: 26, image: guest26 },
  { id: 27, image: guest27 },
  { id: 28, image: guest28, isLast: true, hasLoginButton: true },
];
