import { create } from "zustand";

interface OnboardingStore {
  foodTypes: string[];
  skillLevel: string;
  selectedGoal: { id: string; title: string };
  goalCount: string;

  step: number;
  isFinished: boolean;
  showNotification: boolean;
  showInstallGuide: boolean;

  setFoodTypes: (types: string[] | ((prev: string[]) => string[])) => void;
  setSkillLevel: (level: string) => void;
  setSelectedGoal: (goal: { id: string; title: string }) => void;
  setGoalCount: (count: string) => void;

  setStep: (step: number) => void;
  setIsFinished: (val: boolean) => void;
  setShowNotification: (val: boolean) => void;
  setShowInstallGuide: (val: boolean) => void;

  resetOnboarding: () => void;
}

export const useOnboardingStore = create<OnboardingStore>((set) => ({
  foodTypes: [],
  skillLevel: "",
  selectedGoal: { id: "", title: "" },
  goalCount: "",

  step: 0,
  isFinished: false,
  showNotification: false,
  showInstallGuide: false,

  setFoodTypes: (types) =>
    set((state) => ({
      foodTypes: typeof types === "function" ? types(state.foodTypes) : types,
    })),
  setSkillLevel: (skillLevel) => set({ skillLevel }),
  setSelectedGoal: (selectedGoal) => set({ selectedGoal }),
  setGoalCount: (goalCount) => set({ goalCount }),

  setStep: (step) => set({ step }),
  setIsFinished: (isFinished) => set({ isFinished }),
  setShowNotification: (showNotification) => set({ showNotification }),
  setShowInstallGuide: (showInstallGuide) => set({ showInstallGuide }),

  resetOnboarding: () =>
    set({
      foodTypes: [],
      skillLevel: "",
      selectedGoal: { id: "", title: "" },
      goalCount: "",
      step: 0,
      isFinished: false,
      showNotification: false,
      showInstallGuide: false,
    }),
}));
