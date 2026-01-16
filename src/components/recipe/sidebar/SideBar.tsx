import React from "react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  return (
    <>
      {/* 1. 배경 오버레이 (클릭 시 닫힘) */}
      <div
        className={`fixed inset-0 z-[120] bg-[#11111180] backdrop-blur-[2px] transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* 2. 사이드바 본체 */}
      <div
        className={`fixed top-0 ${positionClasses} z-[130] w-[280px] h-full bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${translateClasses}`}
      >
        <div className="flex flex-col h-full">
          {/* 헤더 영역 */}
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">{title}</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg
                className="w-6 h-6 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* 콘텐츠 영역 */}
          <div className="flex-1 overflow-y-auto p-5">{children}</div>

          {/* 푸터 영역 (선택 사항) */}
          <div className="p-5 border-t border-gray-100">
            <button
              className="w-full py-3 bg-[var(--color-green-deep)] text-white rounded-[10px] font-semibold"
              onClick={onClose}
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
