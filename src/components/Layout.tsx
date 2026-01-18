// src/components/layout/Layout.tsx
import { Outlet, useLocation } from "react-router-dom";
import MainHeader from "./fixed/MainHeader";
import TabBar from "./fixed/TabBar";
import { useState, useEffect } from "react";

export default function Layout() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("냉장고");

  const isRecipe = location.pathname.startsWith("/recipe"); //추가

  useEffect(() => {
    const path = location.pathname;
    if (path.includes("fridge")) setActiveTab("냉장고");
    else if (path.includes("recipe")) setActiveTab("레시피");
    else if (path.includes("cookeeps")) setActiveTab("쿠킵스");
    else if (path.includes("mypage")) setActiveTab("MY쿠킵");
  }, [location]);

  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      {!isRecipe && <MainHeader />}
      <main
        className={
          isRecipe
            ? "pb-[90px]" // 하단바 공간만
            : "pt-[102px] pb-[90px]"
        }
      >
        <Outlet />
      </main>
      <TabBar selectedTab={activeTab} onSelect={(name) => setActiveTab(name)} />
    </div>
  );
}
