import { useState } from "react";
import MyCookeepTabBar from "../../components/myCookeep/fixed/MyCookeepTabBar";
import Profile from "../../components/myCookeep/fixed/Profile";

export default function MyCookeepPage() {
  const [activeTab, setActiveTab] = useState("record");
  return (
    <>
      <Profile />
      <div className="mt-6">
        <MyCookeepTabBar activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
      <div>
        {/* 여기에 들어갈 컴포넌트 작성
      {activeTab === "record" ? <MyRecipes /> : <Calendar />} */}
      </div>
    </>
  );
}
