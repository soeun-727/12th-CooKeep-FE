import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// UI Components
import Footer from "./Footer";
import Progress from "./Progress";
import FoodType from "./FoodType";
import Skill from "./Skill";
import Goal from "./Goal";
import SpecificGoal from "./SpecificGoal";
import AuthHeader from "../AuthHeader";
import Last from "./Last";
import Notification from "./Notification";
import InstallGuide from "./InstallGuide";

// API & Store & Utils
import { saveOnboardingInfo } from "../../../api/user";
import { useOnboardingStore } from "../../../stores/useOnboardingStore";
import { GOAL_TYPE_MAP } from "../../../utils/mapping";

// 매퍼 상수 (컴포넌트 외부 정의)
export const FOOD_TYPE_MAP: Record<string, string> = {
  한식: "KOREAN",
  중식: "CHINESE",
  일식: "JAPANESE",
  양식: "WESTERN",
  건강식: "HEALTHY",
  인스턴트식: "FAST_FOOD",
};

export const SKILL_LEVEL_MAP: Record<string, string> = {
  "완전 초보": "BEGINNER",
  "간단한 요리는 가능": "BASIC",
  "먹고살기에 나쁘지 않은 수준": "INTERMEDIATE",
  "요리 고수": "ADVANCED",
};

export default function Onboarding() {
  const navigate = useNavigate();
  const {
    foodTypes,
    setFoodTypes,
    skillLevel,
    setSkillLevel,
    selectedGoal,
    setSelectedGoal,
    goalCount,
    setGoalCount,
    step,
    setStep,
    isFinished,
    setIsFinished,
    showNotification,
    setShowNotification,
    showInstallGuide,
    setShowInstallGuide,
  } = useOnboardingStore();

  const [isLoading, setIsLoading] = useState(false);

  // --- 비즈니스 로직 ---

  const handleSaveOnboarding = async () => {
    setIsLoading(true);
    try {
      // 🚀 데이터 가공 시 매퍼 키가 정확한지 다시 한번 확인하세요.
      const requestBody = {
        favoriteFoodTypes:
          foodTypes.length > 0
            ? foodTypes.map((type) => FOOD_TYPE_MAP[type])
            : null,
        cookingLevel: skillLevel ? SKILL_LEVEL_MAP[skillLevel] : null,
        goalActionType: selectedGoal.id
          ? (GOAL_TYPE_MAP as Record<string, any>)[selectedGoal.id]?.value
          : null,
        targetCount:
          goalCount && parseInt(goalCount, 10) > 0
            ? parseInt(goalCount, 10)
            : null,
      };

      const response = await saveOnboardingInfo(requestBody);

      // 서버 응답 규격이 { status: "OK", data: ... } 라면 아래 조건이 맞습니다.
      if (response.status === 200 || response.data?.status === "OK") {
        setIsFinished(true);
      }
    } catch (error) {
      console.error("저장 실패:", error);
      alert("입력 정보를 저장하는 데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
    else handleSaveOnboarding();
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const skipStep = () => {
    if (step >= 2) handleSaveOnboarding();
    else nextStep();
  };

  const getIsValid = () => {
    switch (step) {
      case 0:
        return foodTypes.length > 0;
      case 1:
        return skillLevel !== "";
      case 2:
        return !!selectedGoal.id;
      case 3:
        const count = parseInt(goalCount, 10);
        return !isNaN(count) && count >= 1 && count <= 10;
      default:
        return false;
    }
  };

  // --- 조건부 렌더링 (순서 중요!) ---

  if (showInstallGuide)
    return <InstallGuide onFinish={() => navigate("/fridge")} />;
  if (showNotification)
    return <Notification onNext={() => setShowInstallGuide(true)} />;
  if (isFinished) return <Last onStart={() => setShowNotification(true)} />;

  // --- 기본 온보딩 UI ---

  return (
    <>
      <AuthHeader />
      <div className="min-h-screen relative pb-32 bg-[#FAFAFA]">
        <div className="w-[361px] mx-auto flex flex-col items-center">
          <Progress currentStep={step} />

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
          isLastStep={step === 3}
          isValid={getIsValid()}
          isLoading={isLoading}
        />
      </div>
    </>
  );
}
