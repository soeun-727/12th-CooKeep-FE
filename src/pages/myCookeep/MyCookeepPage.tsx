import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MyCookeepTabBar from "../../components/myCookeep/fixed/MyCookeepTabBar";
import Profile from "../../components/myCookeep/fixed/Profile";
import Statistics from "../../components/myCookeep/contents/Statistics";
import Calendar from "../../components/myCookeep/contents/Calendar";
import RecordEntry from "../../components/myCookeep/record/RecordEntry";
import AddMoreModal from "../../components/myCookeep/record/AddMoreModal";
import { hasTodayRecord } from "../../utils/record";
import type { CookeepRecord } from "../../types/record";
import { useCookeepRecordStore } from "../../stores/useCookeepRecordStore";
import RecordCard from "../../components/myCookeep/record/RecordCard";

type TabType = "record" | "calendar" | "statistics";

export default function MyCookeepPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const records = useCookeepRecordStore((state) => state.records);
  const [activeTab, setActiveTab] = useState<TabType>("record");
  const [dismissed, setDismissed] = useState(false);
  const [selectedRecords, setSelectedRecords] = useState<CookeepRecord[]>([]);
  const [enteredByBottomTab, setEnteredByBottomTab] = useState(
    location.state?.fromTab === true,
  );
  const calendarRecordMap = useMemo(() => {
    return records.reduce(
      (acc, rec) => {
        const dateKey = rec.createdAt.replaceAll("-", ".");
        acc[dateKey] = rec.images[0]?.url;
        return acc;
      },
      {} as Record<string, string>,
    );
  }, [records]);

  const handleTabChange = (tab: string) => {
    if (tab === "record" || tab === "calendar" || tab === "statistics") {
      setSelectedRecords([]);
      setActiveTab(tab);
      setDismissed(false);
      setEnteredByBottomTab(false);
    }
  };
  const handleDateClick = (dateStr: string) => {
    const founds = records.filter(
      (r) => r.createdAt.replaceAll("-", ".") === dateStr,
    );
    if (founds.length > 0) {
      setSelectedRecords(founds);
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
        if (selectedRecords.length > 0) {
          return (
            <div className="flex flex-col items-center gap-6 px-4 animate-in fade-in duration-300">
              {selectedRecords.map((record) => (
                <RecordCard key={record.id} record={record} />
              ))}
            </div>
          );
        }
        return (
          <Calendar records={calendarRecordMap} onDateClick={handleDateClick} />
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

      <div className="flex-1 mt-[10px] mb-[15px]">{renderContent()}</div>

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
