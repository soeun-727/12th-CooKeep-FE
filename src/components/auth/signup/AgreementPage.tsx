import React from "react";
import Button from "../../ui/Button";
import BackHeader from "../../ui/BackHeader";
import type { AgreementItem } from "../../../constants/agreements";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface AgreementPageProps {
  agreement: AgreementItem;
  isChecked: boolean;
  onBack: () => void;
  onConfirm: (key: AgreementItem["key"]) => void;
  children?: React.ReactNode;
}

export default function AgreementPage({
  agreement,
  isChecked,
  onBack,
  onConfirm,
  children,
}: AgreementPageProps) {
  const isPolicyOnly = agreement.key === "policy";

  return (
    <div className="flex flex-col w-full min-h-full px-4 pt-[129px]">
      {/* 공통 뒤로가기 헤더 */}
      <BackHeader title="이용 약관" onBack={onBack} />

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
    max-h-[calc(100vh-255px-32px)]
  "
      >
        {/* 체크박스 + 제목 영역 */}
        <div className="flex items-center gap-[16px] p-3 h-[48px]">
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
        <div className="p-3 overflow-y-auto max-h-[calc(100vh-255px-32px)]">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h2: ({ children }) => (
                <h2 className="typo-body-sm text-[#202020] mt-2 mb-2">
                  {children}
                </h2>
              ),

              p: ({ children }) => (
                <p className="typo-body-sm text-[#7D7D7D] mb-[6px]">
                  {children}
                </p>
              ),

              li: ({ children }) => (
                <li className="typo-body-sm text-[#7D7D7D] ml-4 list-disc">
                  {children}
                </li>
              ),

              strong: ({ children }) => (
                <strong className="typo-body-sm font-medium text-[#D91F1F]">
                  {children}
                </strong>
              ),
              // table 부분 크기 고정시키면 이상하게 나와서 뺌 그래서 피그마랑 구조 다름
              table: ({ children }) => (
                <div className="my-4">
                  <table className="border border-[#D1D1D1] border-collapse bg-white">
                    {children}
                  </table>
                </div>
              ),

              tr: ({ children }) => <tr>{children}</tr>,

              th: ({ children }) => (
                <th className="typo-caption text-[#7D7D7D] text-center px-[16.5px] py-[6px] border border-[#D1D1D1] bg-white">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="typo-caption text-[#7D7D7D] text-center px-[16.5px] py-[6px] border border-[#D1D1D1] bg-white">
                  {children}
                </td>
              ),
              a: ({ children, href }) => (
                <a
                  href={href}
                  className="underline text-[#7D7D7D] typo-body-sm"
                >
                  {children}
                </a>
              ),
            }}
          >
            {agreement.content}
          </ReactMarkdown>
        </div>
      </div>

      {/* AgreementItem에 없는 추가 영역 */}
      {children && <div className="mt-3 max-w-[361px] mx-auto">{children}</div>}

      {/* 하단 버튼 */}
      <div className="mt-[11px] mb-[32px] max-w-[361px] mx-auto">
        <Button
          size="L"
          variant="black"
          onClick={() => {
            onConfirm(agreement.key); // 항상 호출
          }}
        >
          확인
        </Button>
      </div>
    </div>
  );
}
