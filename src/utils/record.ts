// src/utils/record.ts
export const getTodayKey = () => new Date().toISOString().slice(0, 10);

export const hasTodayRecord = () => {
  return localStorage.getItem(`record-${getTodayKey()}`) === "true";
};

export const setTodayRecord = () => {
  localStorage.setItem(`record-${getTodayKey()}`, "true");
};
