import { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { saveOnboardingInfo } from "../../../api/user";
import axios from "axios";
import { useOnboardingStore } from "../../../stores/useOnboardingStore";

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

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleSaveOnboarding();
    }
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const skipStep = () => {
    if (step === 2 || step === 3) {
      handleSaveOnboarding();
    } else {
      nextStep();
    }
  };

  const handleSaveOnboarding = async () => {
    setIsLoading(true);
    try {
      const requestBody = {
        favoriteFoodTypes: foodTypes.map((type) => FOOD_TYPE_MAP[type]),
        cookingLevel: SKILL_LEVEL_MAP[skillLevel] || "BEGINNER",
        goalActionType: GOAL_TYPE_MAP[selectedGoal.id] || "COOKING",
        targetCount: parseInt(goalCount, 10) || 1,
      };
      console.log("최종 전송 데이터:", requestBody);
      const response = await saveOnboardingInfo(requestBody);

      if (response.status === 200) {
        setIsFinished(true);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("서버 응답 상세:", error.response?.data);
      }
      alert("입력 정보를 다시 확인해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  if (showInstallGuide)
    return <InstallGuide onFinish={() => navigate("/fridge")} />;
  if (showNotification)
    return <Notification onNext={() => setShowInstallGuide(true)} />;
  if (isFinished) return <Last onStart={() => setShowNotification(true)} />;

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

  return (
    <>
      <AuthHeader />
      <div className="min-h-screen relative pb-32">
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

export const GOAL_TYPE_MAP: Record<string, string> = {
  cook: "COOKING",
  photo: "PHOTO_RECORD",
  expired: "USE_EXPIRING_INGREDIENT",
  like: "RECIPE_LIKE",
};
