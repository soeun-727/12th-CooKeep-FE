// src/components/layout/Layout.tsx
import { Outlet, useLocation } from "react-router-dom";
import MainHeader from "../components/fixed/MainHeader";
import TabBar from "../components/fixed/TabBar";
import { useState, useEffect } from "react";

export default function Layout() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("냉장고");

  const isRecipe = location.pathname.startsWith("/recipe"); //추가

  // 레시피 중 TabBar를 숨길 페이지들
  const hideTabBarInRecipe =
    location.pathname.startsWith("/recipe/select") ||
    location.pathname.startsWith("/recipe/confirm") ||
    location.pathname.startsWith("/recipe/loading");

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
            ? hideTabBarInRecipe
              ? "" // 탭바 없으면 여백도 없음
              : "pb-[90px]"
            : "pt-[102px] pb-[90px]"
        }
      >
        <Outlet />
      </main>
      {!(isRecipe && hideTabBarInRecipe) && (
        <TabBar
          selectedTab={activeTab}
          onSelect={(name) => setActiveTab(name)}
        />
      )}
    </div>
  );
}
