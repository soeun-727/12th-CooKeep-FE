import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

  // Onboarding.tsx

  // 1. 건너뛰기 클릭 시 처리 로직
  const skipStep = () => {
    if (step === 2) {
      // 🚀 Goal에서 건너뛰기를 누르면 Goal과 SpecificGoal 모두 null 처리
      setSelectedGoal({ id: "", title: "" });
      setGoalCount("");
      handleSaveOnboarding(true); // 즉시 저장 혹은 마지막 단계로 점프
      return;
    }

    if (step === 0) setFoodTypes([]);
    if (step === 1) setSkillLevel("");

    nextStep();
  };

  // 2. 데이터 가공 로직 (가장 중요)
  const handleSaveOnboarding = async (isForcedSkip: boolean = false) => {
    setIsLoading(true);
    try {
      const requestBody = {
        favoriteFoodTypes:
          foodTypes.length > 0 ? foodTypes.map((t) => FOOD_TYPE_MAP[t]) : null,
        cookingLevel: skillLevel ? SKILL_LEVEL_MAP[skillLevel] : null,

        // 🚀 포인트: isForcedSkip이거나 id가 없으면 null, 그 외엔 선택값 혹은 기본값("cook")
        goalActionType:
          isForcedSkip || (!selectedGoal.id && step < 2)
            ? null
            : (GOAL_TYPE_MAP as any)[selectedGoal.id || "cook"]?.value,

        targetCount:
          isForcedSkip || (!goalCount && step < 3)
            ? null
            : parseInt(goalCount || "3", 10),
      };

      const response = await saveOnboardingInfo(requestBody);
      if (response.status === 200 || response.data?.status === "OK") {
        setIsFinished(true);
      }
    } catch (error) {
      console.error("저장 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 3. 버튼 활성화 로직
  const getIsValid = () => {
    switch (step) {
      case 0:
        return foodTypes.length > 0; // 응답 없으면 disable
      case 1:
        return skillLevel !== ""; // 응답 없으면 disable
      case 2:
        return true; // 기본값(cook)이 있으므로 항상 enable
      case 3:
        return true; // 기본값(3)이 있으므로 항상 enable
      default:
        return false;
    }
  };

  // 2. 호출부 수정
  const nextStep = () => {
    if (step < 3) setStep(step + 1);
    else handleSaveOnboarding(false); // 일반 '다음' 클릭 시 false 전송
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  // --- 조건부 렌더링 (순서 중요!) ---

  if (showInstallGuide)
    return <InstallGuide onFinish={() => navigate("/fridge")} />;
  if (showNotification)
    return <Notification onNext={() => setShowInstallGuide(true)} />;
  if (isFinished) return <Last onStart={() => setShowNotification(true)} />;

  // --- 기본 온보딩 UI ---

  return (
    <div className="flex flex-col h-[100dvh] bg-[#FAFAFA]">
      <AuthHeader />
      <div className="w-full max-w-[361px] mx-auto px-1">
        <Progress currentStep={step} />
      </div>
      <div className="flex-1 flex flex-col items-center">
        <div className="w-full max-w-[361px] px-1">
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
      </div>
      <div className="shrink-0">
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
    </div>
  );
}
