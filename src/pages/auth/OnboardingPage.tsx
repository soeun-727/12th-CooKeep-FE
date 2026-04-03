import { useState } from "react";
import { useNavigate } from "react-router-dom";

// UI Components
import InstallGuide from "../../components/auth/onboarding/InstallGuide";
import AuthHeader from "../../components/auth/AuthHeader";
import Progress from "../../components/auth/onboarding/Progress";
import Goal from "../../components/auth/onboarding/Goal";
import SpecificGoal from "../../components/auth/onboarding/SpecificGoal";
import Footer from "../../components/auth/onboarding/Footer";
import Notification from "../../components/auth/onboarding/Notification";
import Last from "../../components/auth/onboarding/Last";

// API & Store & Utils
import { saveOnboardingInfo } from "../../api/user";
import { useOnboardingStore } from "../../stores/useOnboardingStore";
import { GOAL_TYPE_MAP } from "../../utils/mapping";
import Guide from "../../components/auth/onboarding/Guide";
import Preference from "../../components/auth/onboarding/Preference";

export default function Onboarding() {
  const navigate = useNavigate();
  const {
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

  // --- 유효성 검사 로직 ---
  const getIsValid = () => {
    if (step === 0) return true;
    if (step === 1) return true;
    if (step === 2) return selectedGoal.id !== "";
    if (step === 3) return goalCount !== "";
    return false;
  };

  // --- 비즈니스 로직 ---

  // Onboarding.tsx

  // 1. 건너뛰기 클릭 시 처리 로직
  const skipStep = () => {
    if (step === 2) {
      setSelectedGoal({ id: "", title: "" });
      setGoalCount("");
      handleSaveOnboarding(true); // 즉시 저장 혹은 마지막 단계로 점프
      return;
    }
    nextStep();
  };

  // 2. 데이터 가공 로직 (가장 중요)
  const handleSaveOnboarding = async (isForcedSkip: boolean = false) => {
    setIsLoading(true);
    try {
      const requestBody = {
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

  // 2. 호출부 수정
  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleSaveOnboarding(false);
    }
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
          {step === 0 && <Guide />}
          {step === 1 && <Preference />}
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
