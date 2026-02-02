import { useState } from "react";
import MyCookeepTabBar from "../../components/myCookeep/fixed/MyCookeepTabBar";
import Profile from "../../components/myCookeep/fixed/Profile";
import Statistics from "../../components/myCookeep/contents/Statistics";
import Calendar from "../../components/myCookeep/contents/Calendar";
import tempImage from "../../assets/temporary-image.png";
import RecordEntry from "../../components/myCookeep/record/RecordEntry";

const recordData = {
  "2026.01.19": tempImage,
  "2026.01.20": tempImage,
  "2026.01.21": tempImage,
  "2026.01.25": tempImage,
};

export default function MyCookeepPage() {
  const [activeTab, setActiveTab] = useState("record");
  const renderContent = () => {
    switch (activeTab) {
      case "calendar":
        return (
          <Calendar
            records={recordData}
            onDateClick={(date) => console.log(date)}
          />
        );
      case "record":
        return <RecordEntry />;
      case "statistics":
        return <Statistics />;
      // default:
      //   return <Record />;
    }
  };

  return (
    <>
      <Profile />
      <div className="mt-6">
        <MyCookeepTabBar activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
      <div className="flex-1 mb-[15px]">{renderContent()}</div>
    </>
  );
}
