import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MyCookeepTabBar from "../../components/myCookeep/fixed/MyCookeepTabBar";
import Profile from "../../components/myCookeep/fixed/Profile";
import Statistics from "../../components/myCookeep/contents/Statistics";
import Calendar from "../../components/myCookeep/contents/Calendar";
import RecordEntry from "../../components/myCookeep/record/RecordEntry";
import AddMoreModal from "../../components/myCookeep/record/AddMoreModal";
import { hasTodayRecord } from "../../utils/record";
import RecordCard from "../../components/myCookeep/record/RecordCard";
import { DailyRecipe, getDailyRecipesByDate } from "../../api/myRecipe";

type TabType = "record" | "calendar" | "statistics";

export default function MyCookeepPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<TabType>("record");
  const [dismissed, setDismissed] = useState(false);
  const [selectedRecords, setSelectedRecords] = useState<DailyRecipe[]>([]);
  const [enteredByBottomTab, setEnteredByBottomTab] = useState(
    location.state?.fromTab === true,
  );

  const getKstToday = () => {
    return new Date(new Date().getTime() + 9 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];
  };

  const fetchDailyData = async (dateStr: string) => {
    try {
      const response = await getDailyRecipesByDate(dateStr);
      if (response.status === "OK") {
        setSelectedRecords(response.data);
      }
    } catch (error) {
      console.error("레시피 조회 실패:", error);
      setSelectedRecords([]);
    }
  };

  useEffect(() => {
    if (activeTab === "record") {
      fetchDailyData(getKstToday());
    }
  }, [activeTab]); // 여기서 fetchDailyData 의존성 에러가 나면 useCallback으로 감싸거나 일단 이대로 진행하세요.

  const handleDateClick = (dateStr: string) => {
    const requestDate = dateStr.replaceAll(".", "-");
    fetchDailyData(requestDate);
  };

  const handleTabChange = (tab: string) => {
    if (tab === "record" || tab === "calendar" || tab === "statistics") {
      setSelectedRecords([]);
      setActiveTab(tab);
      setDismissed(false);
      setEnteredByBottomTab(false);
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
            <div className="flex flex-col items-center gap-6 px-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="flex w-full items-center justify-between px-2">
                <span className="typo-h3 text-neutral-800">
                  {selectedRecords[0].createdAt
                    .split("T")[0]
                    .replaceAll("-", ".")}
                </span>
                <button
                  onClick={() => setSelectedRecords([])}
                  className="typo-body2 text-gray-400 underline"
                >
                  달력으로 돌아가기
                </button>
              </div>
              {selectedRecords.map((record) => (
                <RecordCard key={record.dailyRecipeId} record={record} />
              ))}
            </div>
          );
        }
        return <Calendar onDateClick={handleDateClick} />;

      case "statistics":
        return <Statistics />;

      case "record":
      default:
        // 🚀 여기를 수정합니다!
        // 오늘 날짜 데이터(selectedRecords)가 있다면 카드를, 없다면 안내 문구(RecordEntry)를 보여줍니다.
        if (selectedRecords.length > 0) {
          return (
            <div className="flex flex-col items-center gap-6 px-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
              {selectedRecords.map((record) => (
                <RecordCard key={record.dailyRecipeId} record={record} />
              ))}
            </div>
          );
        }
        return <RecordEntry records={selectedRecords} />;
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
