import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MyCookeepTabBar from "../../components/myCookeep/fixed/MyCookeepTabBar";
import Profile from "../../components/myCookeep/fixed/Profile";
import Statistics from "../../components/myCookeep/contents/Statistics";
import Calendar from "../../components/myCookeep/contents/Calendar";
import RecordEntry from "../../components/myCookeep/record/RecordEntry";
import AddMoreModal from "../../components/myCookeep/record/AddMoreModal";
import tempImage from "../../assets/temporary-image.png";
import { hasTodayRecord } from "../../utils/record";

type TabType = "record" | "calendar" | "statistics";

const recordData = {
  "2026.01.19": tempImage,
  "2026.01.20": tempImage,
  "2026.01.21": tempImage,
  "2026.01.25": tempImage,
};

export default function MyCookeepPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<TabType>("record");
  const [dismissed, setDismissed] = useState(false);

  // ✅ 핵심: 초기값에서만 판단
  const [enteredByBottomTab, setEnteredByBottomTab] = useState(
    location.state?.fromTab === true,
  );

  /** 내부(MyCookeep) 탭 이동 */
  const handleTabChange = (tab: string) => {
    if (tab === "record" || tab === "calendar" || tab === "statistics") {
      setActiveTab(tab);
      setDismissed(false);
      setEnteredByBottomTab(false); // 내부 이동이면 절대 모달 X
    }
  };

  const shouldShowAddMoreModal =
    activeTab === "record" &&
    enteredByBottomTab &&
    hasTodayRecord() &&
    !dismissed;

  const renderContent = () => {
    switch (activeTab) {
      case "calendar":
        return (
          <Calendar
            records={recordData}
            onDateClick={(date) => console.log(date)}
          />
        );
      case "statistics":
        return <Statistics />;
      case "record":
      default:
        return <RecordEntry />;
    }
  };

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
