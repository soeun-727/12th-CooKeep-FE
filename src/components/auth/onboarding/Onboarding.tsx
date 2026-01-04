import { useState } from "react";
import Footer from "./Footer";
import Progress from "./Progress";
import FoodType from "./FoodType";
import Skill from "./Skill";
import Goal from "./Goal";
import SpecificGoal from "./SpecificGoal";
import AuthHeader from "../AuthHeader";

export default function Onboarding() {
  const [step, setStep] = useState(0);
  // 각 단계별 응답 저장 상태 (추후 API 연동)
  const [foodTypes, setFoodTypes] = useState<string[]>([]); // 다중 선택 (최대 3개)
  const [skillLevel, setSkillLevel] = useState<string>(""); // 단일 선택
  const [selectedGoal, setSelectedGoal] = useState({
    id: "cook",
    title: "주 n회 요리하기",
  }); // 목표 선택
  const [goalCount, setGoalCount] = useState<string>("3"); // 목표 수치 입력

  const nextStep = () => {
    if (step < STEPS.length - 1) setStep((prev) => prev + 1);
    else {
      //최종 DB 저장 로직 수행
    }
  };
  const prevStep = () => {
    if (step > 0) setStep((prev) => prev - 1);
  };
  const skipStep = () => {
    nextStep();
  };

  // 현재 스텝의 입력값이 유효한지 체크 (Footer의 다음 버튼 활성화용)
  const getIsValid = () => {
    switch (step) {
      case 0:
        return foodTypes.length > 0; // 음식 취향 1개 이상 선택 시
      case 1:
        return skillLevel !== ""; // 숙련도 선택 시
      case 2:
        return !!selectedGoal.id; // 목표 선택 시 (기본값 있어서 항상 true일 가능성 높음)
      case 3:
        const count = parseInt(goalCount, 10);
        return !isNaN(count) && count >= 1 && count <= 10; // 1~10 사이 입력 시
      default:
        return false;
    }
  };

  //컴포넌트 배열
  const STEPS = [
    <FoodType selectedTypes={foodTypes} onToggle={setFoodTypes} />,
    <Skill selectedSkill={skillLevel} onSelect={setSkillLevel} />,
    <Goal selectedGoal={selectedGoal} onSelect={setSelectedGoal} />,
    <SpecificGoal
      selectedGoal={selectedGoal}
      count={goalCount}
      onCountChange={setGoalCount}
    />,
  ];
  return (
    <>
      <AuthHeader />
      <div className="flex flex-col min-h-screen items-center relative pb-32">
        <Progress currentStep={step} />
        <div className="w-full flex flex-col items-center justify-center">
          {/* 배열 방식 대신 switch나 조건부 렌더링 사용 */}
          {step === 0 && (
            <FoodType selectedTypes={foodTypes} onToggle={setFoodTypes} />
          )}
          {step === 1 && (
            <Skill selectedSkill={skillLevel} onSelect={setSkillLevel} />
          )}
          {step === 2 && (
            <Goal selectedGoal={selectedGoal} onSelect={setSelectedGoal} />
          )}
          {step === 3 && (
            <SpecificGoal
              selectedGoal={selectedGoal}
              count={goalCount}
              onCountChange={setGoalCount}
            />
          )}
        </div>

        <Footer
          onNext={nextStep}
          onPrev={prevStep}
          onSkip={skipStep}
          isFirstStep={step === 0}
          isValid={getIsValid()}
        />
      </div>
    </>
  );
}
