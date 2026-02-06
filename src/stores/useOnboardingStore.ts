import { create } from "zustand";

interface OnboardingStore {
  // 데이터 상태
  foodTypes: string[];
  skillLevel: string;
  selectedGoal: { id: string; title: string };
  goalCount: string;

  // 액션
  setFoodTypes: (types: string[] | ((prev: string[]) => string[])) => void;
  setSkillLevel: (level: string) => void;
  setSelectedGoal: (goal: { id: string; title: string }) => void;
  setGoalCount: (count: string) => void;

  // 초기화 (온보딩 완료 후나 이탈 시 사용)
  resetOnboarding: () => void;
}

export const useOnboardingStore = create<OnboardingStore>((set) => ({
  foodTypes: [],
  skillLevel: "",
  selectedGoal: { id: "cook", title: "주 n회 요리하기" },
  goalCount: "3",

  setFoodTypes: (types) =>
    set((state) => ({
      // 만약 types가 함수라면 현재 foodTypes를 넣어서 실행한 결과를, 아니면 그냥 값을 저장
      foodTypes: typeof types === "function" ? types(state.foodTypes) : types,
    })),
  setSkillLevel: (skillLevel) => set({ skillLevel }),
  setSelectedGoal: (selectedGoal) => set({ selectedGoal }),
  setGoalCount: (goalCount) => set({ goalCount }),
  resetOnboarding: () =>
    set({
      foodTypes: [],
      skillLevel: "",
      selectedGoal: { id: "cook", title: "주 n회 요리하기" },
      goalCount: "3",
    }),
}));
