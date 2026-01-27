// src/layouts/ListLayout.tsx
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import BackHeader from "../components/ui/BackHeader";
import ViewListHeader from "../components/cookeeps/lists/ViewListHeader";
import ViewAllHeader from "../components/cookeeps/lists/ViewAllHeader";

export default function ListLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const mainRef = useRef<HTMLDivElement>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("좋아요 많은 순");

  // 🔑 라우트 판별
  const isViewAll = location.pathname.endsWith("/all");
  const isLiked = location.pathname.endsWith("/liked");
  const isBookmarked = location.pathname.endsWith("/bookmarked");
  const isViewList = isLiked || isBookmarked;

  const type = isLiked ? "좋아요 누른 레시피" : "북마크한 레시피";

  const description = isLiked
    ? "좋아요가 많은 순서대로 노출됩니다"
    : "저장한 레시피를 한 번에 확인할 수 있어요";

  // ✅ 라우트 변경 시 스크롤 초기화
  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0 });
  }, [location.pathname]);

  return (
    <div className="flex flex-col h-[100dvh] overflow-hidden bg-[#FAFAFA]">
      {/* 항상 고정 */}
      <BackHeader title="레시피 보기" onBack={() => navigate(-1)} />

      {/* 페이지별 고정 헤더 */}
      {isViewAll && (
        <ViewAllHeader
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
        />
      )}

      {isViewList && (
        <ViewListHeader
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          type={type}
          description={description}
        />
      )}

      <main
        ref={mainRef}
        className="flex-1 overflow-y-auto no-scrollbar flex justify-center"
      >
        <Outlet context={{ searchTerm, sortOrder }} />
      </main>
    </div>
  );
}
