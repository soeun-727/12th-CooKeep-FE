import { create } from "zustand";

type RewardType =
  | "ONBOARDING_INGREDIENT"
  | "ONBOARDING_RECIPE"
  | "WEEKLY"
  | "EXPIRING";

interface RewardState {
  queue: RewardType[];
  current: RewardType | null;

  enqueue: (type: RewardType) => void;
  dequeue: () => void;
}

export const useRewardStore = create<RewardState>((set, get) => ({
  queue: [],
  current: null,

  enqueue: (type) => {
    const today = new Date().toISOString().slice(0, 10);

    // D-0 하루 1회 제한
    if (type === "EXPIRING") {
      const key = "expiring_reward_date";
      const saved = localStorage.getItem(key);

      if (saved === today) return; // 이미 받음 → 무시
      localStorage.setItem(key, today);
    }

    const { queue, current } = get();

    // 중복 방지 추가 (핵심)
    if (queue.includes(type) || current === type) return;

    const newQueue = [...queue, type];

    set({
      queue: newQueue,
      current: current ?? newQueue[0], // 현재 없으면 첫번째 실행
    });
  },

  dequeue: () => {
    const { queue } = get();

    const newQueue = queue.slice(1);

    set({
      queue: newQueue,
      current: newQueue[0] ?? null,
    });
  },
}));
