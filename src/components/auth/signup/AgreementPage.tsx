import React from "react";
import Button from "../../ui/Button";
import backIcon from "../../../assets/signup/back.svg";

interface AgreementPageProps {
  agreement: { key: string; label: string; content: string };
  onBack: () => void;
  onAgreeChange: (key: string, checked: boolean) => void;
  isChecked: boolean;
}

export default function AgreementPage({
  agreement,
  onBack,
  onAgreeChange,
  isChecked,
}: AgreementPageProps) {
  return (
    <div className="flex flex-col min-h-screen bg-white p-4">
      {/* 헤더 */}
      <div className="relative w-full h-[24px] flex items-center justify-center">
        <button
          type="button"
          onClick={onBack}
          className="absolute left-0 w-9 h-9 flex items-center justify-center"
        >
          <img src={backIcon} alt="뒤로가기" />
        </button>
        <h1 className="font-semibold text-[16px] leading-6 text-center">
          이용 약관
        </h1>
      </div>

      {/* 약관 체크박스 */}
      <label className="flex items-center gap-2 w-full h-[48px] mt-6 p-3 border border-[#D1D1D1] rounded-lg">
        <input
          type="checkbox"
          className="w-4 h-4 accent-[#7D7D7D]"
          checked={isChecked}
          onChange={(e) => onAgreeChange(agreement.key, e.target.checked)}
        />
        <span className="text-sm font-medium">{agreement.label}</span>
      </label>

      {/* 약관 전문 */}
      <div className="flex-1 mt-4 p-3 border border-[#D1D1D1] rounded-lg overflow-y-auto h-[calc(100vh-250px)]">
        <p className="text-sm whitespace-pre-wrap">{agreement.content}</p>
      </div>

      {/* 하단 버튼 */}
      <div className="mt-4">
        <Button
          size="L"
          className="w-full h-[44px] rounded-[10px] bg-[#202020] text-white"
          onClick={onBack}
        >
          확인
        </Button>
      </div>
    </div>
  );
}
