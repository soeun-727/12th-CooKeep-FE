import tempFoodPhoto from "../../../assets/mycookeep/record/temp_food_photo.svg";
import Button from "../../ui/Button";

export default function MyCookeepRecordEntry() {
  const handleRecordClick = () => {
    console.log("기록하기 클릭");
  };

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
        </div>
      </div>
    </div>
  );
}
