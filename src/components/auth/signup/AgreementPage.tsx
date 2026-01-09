import React from "react";
import Button from "../../ui/Button";
import backIcon from "../../../assets/signup/back.svg";
import type { AgreementItem } from "../../../constants/agreements";

interface AgreementPageProps {
  agreement: AgreementItem;
  isChecked: boolean;
  onBack: () => void;
  onConfirm: (key: AgreementItem["key"]) => void;
}

export default function AgreementPage({
  agreement,
  isChecked,
  onBack,
  onConfirm,
}: AgreementPageProps) {
  const isPolicyOnly = agreement.key === "policy";

  return (
    <div className="min-h-screen bg-white px-4 pt-6">
      {/* 헤더 */}
      <div className="relative w-full h-[24px] flex items-center justify-center mb-4">
        <button
          type="button"
          onClick={onBack}
          className="absolute left-0 w-9 h-9 flex items-center justify-center"
        >
          <img src={backIcon} alt="뒤로가기" />
        </button>
        <h1 className="font-semibold text-[16px] leading-6">이용 약관</h1>
      </div>

      {/* 약관 카드 */}
      <div
        className="
          w-full
          max-w-[361px]
          mx-auto
          bg-white
          border border-[#D1D1D1]
          rounded-[6px]
          flex flex-col
          h-[calc(100vh-160px)]
        "
      >
        {/* 체크박스 + 제목 영역 */}
        <div className="flex items-center gap-[6px] p-3 h-[48px]">
          {!isPolicyOnly ? (
            <input
              type="checkbox"
              checked={isChecked}
              disabled
              className="w-4 h-4 accent-[#7D7D7D]"
            />
          ) : (
            <span className="w-4 h-4 inline-block" />
          )}

          <span className="text-sm font-medium">
            {agreement.label}
            {agreement.required && !isPolicyOnly}
          </span>
        </div>

        {/* 구분선 */}
        <div className="mx-auto w-[332px] border-t-[1.5px] border-[#C3C3C3]" />

        {/* 약관 전문 (스크롤 영역) */}
        <div className="flex-1 overflow-y-auto p-3">
          <p className="text-sm whitespace-pre-wrap">{agreement.content}</p>
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="mt-4 max-w-[361px] mx-auto">
        <Button
          size="L"
          className="w-full h-[44px] rounded-[10px] bg-[#202020] text-white"
          onClick={() => {
            if (agreement.required) {
              onConfirm(agreement.key);
            } else {
              onBack();
            }
          }}
        >
          확인
        </Button>
      </div>
    </div>
  );
}
