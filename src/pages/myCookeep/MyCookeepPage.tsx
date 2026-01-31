import { useState } from "react";
import MyCookeepTabBar from "../../components/myCookeep/fixed/MyCookeepTabBar";
import Profile from "../../components/myCookeep/fixed/Profile";
import Statistics from "../../components/myCookeep/contents/Statistics";

export default function MyCookeepPage() {
  const [activeTab, setActiveTab] = useState("record");
  return (
    <>
      <Profile />
      <div className="mt-6">
        <MyCookeepTabBar activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
      <div>{activeTab === "statistics" ? <Statistics /> : <>기록하기</>}</div>
    </>
  );
}
