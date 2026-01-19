import { useState } from "react";
import menuIcon from "../../../../assets/recipe/main/menu.svg";
import Sidebar from "../../sidebar/SideBar";

export default function RecipeHeader() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <>
      <header
        className="
          absolute top-0 z-50
          w-[400px] max-w-[450px]
          h-[102px]
          bg-[#FAFAFA]
          px-4
        "
      >
        {/* 버튼 */}
        <button
          className="absolute top-[56px] left-[10px] w-[36px] h-[36px]"
          onClick={toggleSidebar} // 버튼 클릭 시 사이드바 토글
        >
          <img
            src={menuIcon}
            alt="메뉴 버튼"
            className="w-full h-full object-contain"
          />
        </button>

        {/* 글씨 */}
        <h1
          className="absolute left-1/2 -translate-x-1/2 text-[16px] leading-[24px] font-semibold text-[#202020]"
          style={{ top: "62px" }}
        >
          오늘의 레시피
        </h1>
      </header>

      {/* 사이드바 */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
}
