// src/components/cookeeps/WaterModal.tsx
// import { useState } from "react";
import waterCookieImg from "../../../assets/cookeeps/main/water_cookie_cookeeps.svg";

interface WaterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function WaterModal({
  isOpen,
  onClose,
  onConfirm,
}: WaterModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="flex flex-col w-[254px] p-[25px_28px] gap-8 rounded-[10px] bg-white">
        {/* 내용 프레임 */}
        <div className="flex flex-col justify-center items-center gap-16 self-stretch">
          {/* 이미지 + 텍스트 프레임 */}
          <div className="flex flex-col items-center gap-12 self-stretch">
            <img
              src={waterCookieImg}
              alt="물 쿠키"
              className="w-[48px] h-[48px] aspect-square"
            />

            {/* 글씨 두 줄 */}
            <div className="flex flex-col items-start gap-2 self-stretch text-center">
              <span className="self-stretch text-[#1FC16F] font-bold text-[16px]">
                쿠키 10개
              </span>
              <span className="self-stretch text-[#202020] font-medium text-[14px]">
                사용해서 물을 줄까요?
              </span>
            </div>
          </div>

          {/* 버튼들 */}
          <div className="flex flex-col gap-8 self-stretch">
            <button
              className="flex h-[44px] px-[101px] justify-center items-center gap-8 flex-1 rounded-[10px] bg-[#32E389] text-white font-semibold text-[14px]"
              onClick={onConfirm}
            >
              물을 줄게요
            </button>
            <button
              className="flex h-[44px] px-[101px] justify-center items-center gap-8 flex-1 rounded-[10px] bg-[#C3C3C3] text-white font-semibold text-[14px]"
              onClick={onClose}
            >
              돌아가기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
