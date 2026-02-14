import { create } from "zustand";
import {
  updateRecipeVisibility,
  DailyRecipe,
  toggleRecipeLike,
  toggleRecipeBookmark,
} from "../api/myRecipe";

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
  updateRecordLike: (recordId: string) => Promise<void>;
  updateRecordBookmark: (recordId: string) => Promise<void>;
}

export const useCookeepRecordStore = create<RecordState>((set, get) => ({
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

  updateRecordLike: async (recordId: string) => {
    const previousRecords = get().records; // 실패 시 복구용 백업

    // 1. [낙관적 업데이트] 하트 색상과 숫자를 즉시 변경
    set((state) => ({
      records: state.records.map((r) => {
        if (String(r.dailyRecipeId) === recordId) {
          return {
            ...r,
            liked: !r.liked, // true <-> false 반전
            likeCount: r.liked ? r.likeCount - 1 : r.likeCount + 1, // 숫자 증감
          };
        }
        return r;
      }),
    }));

    try {
      // 2. 서버 API 호출
      const res = await toggleRecipeLike(Number(recordId));

      if (res.status !== "OK") throw new Error("좋아요 실패");

      // 3. 서버에서 준 정확한 최종 값으로 동기화 (선택 사항이지만 안전함)
      set((state) => ({
        records: state.records.map((r) =>
          String(r.dailyRecipeId) === recordId
            ? {
                ...r,
                liked: res.data.liked,
                likeCount: res.data.likeCount,
              }
            : r,
        ),
      }));
    } catch (error) {
      console.error("좋아요 처리 실패:", error);
      // 4. [복구] 실패 시 이전 상태로 롤백
      set({ records: previousRecords });
      alert("자신의 글에는 좋아요를 누를 수 없거나 오류가 발생했습니다.");
    }
  },

  updateRecordVisibility: async (recordId: string, isPublic: boolean) => {
    // 1. 이전 상태를 백업 (실패 시 복구용)
    const previousRecords = get().records;

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
  updateRecordBookmark: async (recordId: string) => {
    const previousRecords = get().records;

    // 1. [낙관적 업데이트] 즉시 북마크 아이콘 변경
    set((state) => ({
      records: state.records.map((r) =>
        String(r.dailyRecipeId) === recordId
          ? { ...r, bookmarked: !r.bookmarked }
          : r,
      ),
    }));

    try {
      const res = await toggleRecipeBookmark(Number(recordId));
      if (res.status !== "OK") throw new Error();

      // 2. 서버 응답 결과로 데이터 확정
      set((state) => ({
        records: state.records.map((r) =>
          String(r.dailyRecipeId) === recordId
            ? { ...r, bookmarked: res.data.bookmarked }
            : r,
        ),
      }));
    } catch (error) {
      console.error("북마크 처리 실패:", error);
      set({ records: previousRecords }); // 실패 시 롤백
      alert("북마크 처리에 실패했습니다. (자신의 글은 북마크할 수 없습니다)");
    }
  },
}));
