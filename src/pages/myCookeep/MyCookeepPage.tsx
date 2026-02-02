import { useState } from "react";
import MyCookeepTabBar from "../../components/myCookeep/fixed/MyCookeepTabBar";
import Profile from "../../components/myCookeep/fixed/Profile";
import Statistics from "../../components/myCookeep/contents/Statistics";
import Calendar from "../../components/myCookeep/contents/Calendar";
import tempImage from "../../assets/temporary-image.png";
import RecordEntry from "../../components/myCookeep/record/RecordEntry";
import { useNavigate } from "react-router-dom";
import { hasTodayRecord } from "../../utils/record";
import AddMoreModal from "../../components/myCookeep/record/AddMoreModal";

const recordData = {
  "2026.01.19": tempImage,
  "2026.01.20": tempImage,
  "2026.01.21": tempImage,
  "2026.01.25": tempImage,
};

export default function MyCookeepPage() {
  const [activeTab, setActiveTab] = useState("record");

  const navigate = useNavigate();
  const [dismissed, setDismissed] = useState(false);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setDismissed(false); //핵심
  };

  const shouldShowAddMoreModal =
    activeTab === "record" && hasTodayRecord() && !dismissed;

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
  console.log("today record?", hasTodayRecord());

  return (
    <>
      <Profile />
      <div className="mt-6">
        <MyCookeepTabBar activeTab={activeTab} onTabChange={handleTabChange} />
      </div>
      <div className="flex-1 mb-[15px]">{renderContent()}</div>

      {shouldShowAddMoreModal && (
        <AddMoreModal
          onCancel={() => setDismissed(true)}
          onConfirm={() => {
            setDismissed(true);
            navigate("/mycookeep/record/select");
          }}
        />
      )}
    </>
  );
}
