import { create } from "zustand";

interface OnboardingStore {
  selectedGoal: { id: string; title: string };
  goalCount: string;

  step: number;
  isFinished: boolean;
  showNotification: boolean;
  showInstallGuide: boolean;

  setSelectedGoal: (goal: { id: string; title: string }) => void;
  setGoalCount: (count: string) => void;

  setStep: (step: number) => void;
  setIsFinished: (val: boolean) => void;
  setShowNotification: (val: boolean) => void;
  setShowInstallGuide: (val: boolean) => void;

  resetOnboarding: () => void;
}

export const useOnboardingStore = create<OnboardingStore>((set) => ({
  selectedGoal: { id: "cook", title: "주 n회 요리하기" },
  goalCount: "3", // 기본 목표 횟수도 미리 설정 (Step 3 대응)

  step: 0,
  isFinished: false,
  showNotification: false,
  showInstallGuide: false,

  setSelectedGoal: (selectedGoal) => set({ selectedGoal }),
  setGoalCount: (goalCount) => set({ goalCount }),

  setStep: (step) => set({ step }),
  setIsFinished: (isFinished) => set({ isFinished }),
  setShowNotification: (showNotification) => set({ showNotification }),
  setShowInstallGuide: (showInstallGuide) => set({ showInstallGuide }),

  resetOnboarding: () =>
    set({
      selectedGoal: { id: "cook", title: "주 n회 요리하기" },
      goalCount: "3",
      step: 0,
      isFinished: false,
      showNotification: false,
      showInstallGuide: false,
    }),
}));
