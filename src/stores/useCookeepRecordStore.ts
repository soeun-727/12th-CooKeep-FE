import { create } from "zustand";
import { updateRecipeVisibility, DailyRecipe } from "../api/myRecipe"; // 🚀 필요한 API 임포트

export interface RecordImage {
  url: string;
  file?: File;
}

interface RecordState {
  // 입력/수정용 임시 상태
  selectedRecipeId: number | null;
  editingRecordId: string | null;
  title: string;
  memo: string;
  isPublic: boolean | null;
  images: RecordImage[];

  // 상태 변경 함수
  setSelectedRecipeId: (id: number) => void;
  setEditingRecordId: (id: string | null) => void;
  setTitle: (title: string) => void;
  setMemo: (memo: string) => void;
  setIsPublic: (value: boolean) => void;
  addImages: (newImages: RecordImage[]) => void;
  removeImage: (index: number) => void;
  resetRecord: () => void;

  records: DailyRecipe[];
  setRecords: (records: DailyRecipe[]) => void; // 전체 리스트 세팅
  updateRecordVisibility: (
    recordId: string,
    isPublic: boolean,
  ) => Promise<void>;
}

export const useCookeepRecordStore = create<RecordState>((set) => ({
  selectedRecipeId: null,
  editingRecordId: null,
  title: "",
  memo: "",
  isPublic: null,
  images: [],
  records: [],

  setSelectedRecipeId: (id) => set({ selectedRecipeId: id }),
  setEditingRecordId: (id) => set({ editingRecordId: id }),
  setTitle: (title) => set({ title }),
  setMemo: (memo) => set({ memo }),
  setIsPublic: (value) => set({ isPublic: value }),

  addImages: (newImages) =>
    set((state) => ({
      images: [...state.images, ...newImages].slice(0, 2),
    })),

  removeImage: (index) =>
    set((state) => ({
      images: state.images.filter((_, i) => i !== index),
    })),

  resetRecord: () =>
    set({
      selectedRecipeId: null,
      editingRecordId: null,
      title: "",
      memo: "",
      isPublic: null,
      images: [],
    }),

  // 서버 데이터를 스토어에 저장하는 함수
  setRecords: (records) => set({ records }),

  updateRecordVisibility: async (recordId: string, isPublic: boolean) => {
    // 1. 이전 상태를 백업 (실패 시 복구용)
    const previousRecords = useCookeepRecordStore.getState().records;

    // 2. [즉각 반영] 서버 응답 기다리지 않고 UI 상태부터 변경
    set((state) => ({
      records: state.records.map((r) =>
        String(r.dailyRecipeId) === recordId ? { ...r, isPublic } : r,
      ),
    }));

    try {
      // 3. 서버 API 호출
      const res = await updateRecipeVisibility(Number(recordId), isPublic);

      // 만약 서버 응답이 OK가 아니라면 에러를 던져 catch로 보냄
      if (res.status !== "OK") {
        throw new Error("서버 응답 오류");
      }

      console.log(`서버 연동 성공: ${isPublic ? "공개" : "비공개"}`);
    } catch (error) {
      console.error("공개 범위 수정 실패, 원래 상태로 복구합니다:", error);

      // 4. [복구] 서버 요청 실패 시 백업해둔 데이터로 롤백
      set({ records: previousRecords });
      alert("공개 상태 변경에 실패했습니다. 네트워크 연결을 확인해주세요.");
    }
  },
}));
