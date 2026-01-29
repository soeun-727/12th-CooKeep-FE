// src/components/layout/Layout.tsx
import { Outlet, useLocation } from "react-router-dom";
import MainHeader from "../components/fixed/MainHeader";
import TabBar from "../components/fixed/TabBar";
import { useState, useEffect } from "react";
import { useIngredientStore } from "../stores/useIngredientStore";
import { useRecipeFlowStore } from "../stores/useRecipeFlowStore";

export default function Layout() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("냉장고");

  const isRecipe = location.pathname.startsWith("/recipe");
  const isCookeeps = location.pathname.startsWith("/cookeeps");
  const isMyCookeep = location.pathname.startsWith("/mycookeep");

  // 헤더와 탭바의 노출 여부를 변수로 관리
  const showHeader = !isRecipe && !isCookeeps && !isMyCookeep;

  const hideTabBarInRecipe =
    isRecipe &&
    (location.pathname.startsWith("/recipe/select") ||
      location.pathname.startsWith("/recipe/confirm") ||
      location.pathname.startsWith("/recipe/loading") ||
      isMyCookeep);
  const showTabBar = !hideTabBarInRecipe;

  useEffect(() => {
    if (!location.pathname.startsWith("/recipe")) {
      useIngredientStore.getState().clearSelection();
      useRecipeFlowStore.getState().clearSelection();
    }
  }, [location.pathname]);

  useEffect(() => {
    const path = location.pathname;
    if (path.includes("fridge")) setActiveTab("냉장고");
    else if (path.includes("recipe")) setActiveTab("레시피");
    else if (path.includes("cookeeps")) setActiveTab("쿠킵스");
    else if (path.includes("mycookeep")) setActiveTab("MY쿠킵");
  }, [location.pathname]);

  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      {showHeader && <MainHeader />}

      <main
        className={`
          ${showHeader ? "pt-[48px]" : ""} 
          ${showTabBar ? "pb-[90px]" : ""}
        `}
      >
        <Outlet />
      </main>

      {showTabBar && (
        <TabBar
          selectedTab={activeTab}
          onSelect={(name) => setActiveTab(name)}
        />
      )}
    </div>
  );
}
