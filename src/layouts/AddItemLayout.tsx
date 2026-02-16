// src/layouts/AddItemLayout.tsx
import { Outlet, useNavigate } from "react-router-dom";
import BackHeader from "../components/ui/BackHeader";
import { useState } from "react";
import TabBar from "../components/fixed/TabBar";

export default function AddItemLayout() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("냉장고");
  return (
    <div className="flex flex-col h-screen bg-[#FAFAFA] overflow-hidden">
      <BackHeader title="재료 등록" onBack={() => navigate(-1)} />

      <main className="flex-1 pb-[13px]">
        <Outlet />
      </main>
      <TabBar selectedTab={activeTab} onSelect={(name) => setActiveTab(name)} />
    </div>
  );
}
