import { useNavigate } from "react-router-dom";
import tempFoodPhoto from "../../../assets/mycookeep/record/temp_food_photo.svg";
import Button from "../../ui/Button";
import { useCookeepRecordStore } from "../../../stores/useCookeepRecordStore";
import RecordCard from "./RecordCard";
import AddRecordButton from "./AddRecordButton";
import { getKoreaToday } from "../../../utils/date";
import { DailyRecipe } from "../../../api/myRecipe";

interface Props {
  records: DailyRecipe[];
}
export default function RecordEntry({ records }: Props) {
  const navigate = useNavigate();
  const { resetRecord } = useCookeepRecordStore();

  const handleRecordClick = () => {
    resetRecord(); // 신규만 초기화
    navigate("/mycookeep/record/select");
  };

  return (
    <div>
      {/* 바깥 카드 */}
      <div
        className="
          flex justify-center items-center
          px-4 pt-[50px] pb-[72px]
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
          {records.length === 0 ? (
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
              {records.map((record) => (
                <RecordCard key={record.dailyRecipeId} record={record} />
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
