import FoodTypeButton from "./FoodTypeButton";
import Korean from "../../../assets/onboarding/korean.png";
import KoreanGray from "../../../assets/onboarding/korean_gray.png";
import Chinese from "../../../assets/onboarding/chinese.png";
import ChineseGray from "../../../assets/onboarding/chinese_gray.png";
import Japanese from "../../../assets/onboarding/japanese.png";
import JapaneseGray from "../../../assets/onboarding/japanese_gray.png";
import Western from "../../../assets/onboarding/western.png";
import WesternGray from "../../../assets/onboarding/western_gray.png";
import Healthy from "../../../assets/onboarding/healthy.png";
import HealthyGray from "../../../assets/onboarding/healthy_gray.png";
import Instant from "../../../assets/onboarding/instant.png";
import InstantGray from "../../../assets/onboarding/instant_gray.png";
import { useState } from "react";

//01
export default function FoodType() {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const handleToggle = (title: string) => {
    setSelectedTypes((prev) => {
      // 이미 선택된 상태라면 제거 (해제)
      if (prev.includes(title)) {
        return prev.filter((item) => item !== title);
      }
      // 선택되지 않았는데 3개 미만인 경우만 추가
      if (prev.length < 3) {
        return [...prev, title];
      }
      // 3개 초과시 아무 동작 안 함 (혹은 알림창)
      return prev;
    });
  };
  return (
    <>
      <div className="w-[361px] mt-[46px]">
        <h1 className="typo-h1">어떤 종류의 음식을 선호하시나요?</h1>
        <h3 className="typo-h3 text-gray-500">최대 3개까지 선택해주세요</h3>
      </div>
      {/* 음식 카테고리 카드 */}
      <div className="mt-11 flex flex-col gap-2">
        <div className="flex gap-2">
          <FoodTypeButton
            image={Korean}
            grayImage={KoreanGray}
            title="한식"
            isSelected={selectedTypes.includes("한식")}
            onClick={() => handleToggle("한식")}
          />
          <FoodTypeButton
            image={Chinese}
            grayImage={ChineseGray}
            title="중식"
            isSelected={selectedTypes.includes("중식")}
            onClick={() => handleToggle("중식")}
          />
          <FoodTypeButton
            image={Japanese}
            grayImage={JapaneseGray}
            title="일식"
            isSelected={selectedTypes.includes("일식")}
            onClick={() => handleToggle("일식")}
          />
        </div>
        <div className="flex gap-2">
          <FoodTypeButton
            image={Western}
            grayImage={WesternGray}
            title="양식"
            isSelected={selectedTypes.includes("양식")}
            onClick={() => handleToggle("양식")}
          />
          <FoodTypeButton
            image={Healthy}
            grayImage={HealthyGray}
            title="간깅식"
            isSelected={selectedTypes.includes("건강식")}
            onClick={() => handleToggle("건강식")}
          />
          <FoodTypeButton
            image={Instant}
            grayImage={InstantGray}
            title="인스턴트식"
            isSelected={selectedTypes.includes("인스턴트식")}
            onClick={() => handleToggle("인스턴트식")}
          />
        </div>
      </div>
    </>
  );
}
