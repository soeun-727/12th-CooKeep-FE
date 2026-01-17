import { useState } from "react";
import Sidebar from "../sidebar/SideBar";

export default function RecipeTab() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <>
      <button onClick={() => setIsSidebarOpen(true)}>
        <h1>사이드바 테스트</h1>
      </button>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
}
