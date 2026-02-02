import { useNavigate } from "react-router-dom";
import tempFoodPhoto from "../../../assets/mycookeep/record/temp_food_photo.svg";
import Button from "../../ui/Button";
import { useCookeepRecordStore } from "../../../stores/useCookeepRecordStore";
import RecordCard from "./RecordCard";
import AddRecordButton from "./AddRecordButton";

export default function RecordEntry() {
  const navigate = useNavigate();

  const { records, resetRecord } = useCookeepRecordStore(); // resetRecord 추가

  const handleRecordClick = () => {
    resetRecord(); // 신규만 초기화
    navigate("/mycookeep/record/select");
  };

  const today = new Date().toISOString().slice(0, 10);

  const todayRecords = records.filter((r) => r.createdAt === today);

  return (
    <div>
      {/* 바깥 카드 */}
      <div
        className="
          flex justify-center items-center
          px-4 pt-[27px] pb-[26px]
          bg-white
          rounded-b-[6px]
        "
      >
        {/* 내부 컨텐츠 래퍼 */}
        <div
          className="
            flex flex-col
            w-full
            max-w-[361px]
            items-start
            gap-4
          "
        >
          {todayRecords.length === 0 ? (
            <>
              {/* 사진 */}
              <img
                src={tempFoodPhoto}
                alt="임시 요리 이미지"
                className="h-[160px] w-full object-contain"
              />

              {/* 버튼 + 설명 텍스트 */}
              <div
                className="
        flex flex-col items-center
        gap-[6px]
        w-full
      "
              >
                <Button size="L" variant="black" onClick={handleRecordClick}>
                  오늘 만든 요리 기록하기
                </Button>

                <p className="text-center text-[12px] leading-[16px] text-[#7D7D7D]">
                  AI가 추천해준 레시피를 불러와서 기록해보세요
                </p>
              </div>
            </>
          ) : (
            <>
              {todayRecords.map((record) => (
                <RecordCard key={record.id} record={record} />
              ))}

              {/* Floating Button Wrapper */}
              <div className="fixed bottom-1 inset-x-0 z-50 pointer-events-none">
                <div className="max-w-[361px] mx-auto px-4 flex justify-end pointer-events-auto">
                  <AddRecordButton />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
