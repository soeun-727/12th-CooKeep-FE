// src/pages/settings/NoticePage.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackHeader from "../../components/ui/BackHeader";
import {
  mockNoticeCategories,
  type NoticeItemType,
} from "../../constants/mockNoticeData";
import NoticeCategoryItem from "../../components/settings/components/NoticeCategoryItem";

export default function NoticePage() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<NoticeItemType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock 데이터를 시범적으로 불러오기
    const fetchMock = async () => {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 300)); // 가짜 딜레이
      setCategories(mockNoticeCategories);
      setLoading(false);
    };

    fetchMock();
  }, []);

  return (
    <>
      <BackHeader title="공지사항" onBack={() => navigate(-1)} />
      <main className="pt-[129px] px-4 pb-[34px] flex flex-col gap-[14px] min-h-screen">
        {loading ? (
          <p className="text-center text-gray-500">불러오는 중...</p>
        ) : categories.length === 0 ? (
          <p className="text-center text-gray-500">
            등록된 공지사항이 없습니다.
          </p>
        ) : (
          categories.map((category) => (
            <NoticeCategoryItem key={category.id} category={category} />
          ))
        )}
        <p className="pt-[2px] text-center typo-label text-[#202020]">
          오늘 한 끼부터, 쿠킵으로 이어가볼까요?
        </p>
      </main>
    </>
  );
}
