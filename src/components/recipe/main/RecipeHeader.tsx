// components/recipe/main/RecipeHeader.tsx
import { useState } from "react";
import menuIcon from "../../../assets/recipe/main/menu.svg";
import Sidebar from "../sidebar/SideBar";

interface RecipeHeaderProps {
  title?: string; // 제목을 선택 사항으로 변경
}

export default function RecipeHeader({ title }: RecipeHeaderProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <>
      <header
        className="
          absolute top-0 z-50
          w-full max-w-[450px] // w-[400px] 보다는 전체를 채우는게 유연합니다
          h-[102px]
          bg-transparent // 배경을 투명하게 해서 어디든 어울리게 조절 (필요시 수정)
          px-4
        "
      >
        {/* 사이드바 버튼 */}
        <button
          className="absolute top-[2px] left-[10px] w-[36px] h-[36px]"
          onClick={toggleSidebar}
        >
          <img
            src={menuIcon}
            alt="메뉴 버튼"
            className="w-full h-full object-contain"
          />
        </button>

        {/* 제목: title props가 있을 때만 렌더링 */}
        {title && (
          <h1
            className="absolute left-1/2 -translate-x-1/2 text-[16px] leading-[24px] font-semibold text-[#202020]"
            style={{ top: "8px" }}
          >
            {title}
          </h1>
        )}
      </header>

      {/* 사이드바 */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
}
