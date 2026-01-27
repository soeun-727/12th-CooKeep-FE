import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import ListItem from "../../components/cookeeps/lists/ListItem";
import DoublecheckModal from "../../components/ui/DoublecheckModal";
import { useListStore } from "../../stores/useListStore";

interface Props {
  type: string;
}

interface OutletContext {
  searchTerm: string;
}

export default function ViewListPage({ type }: Props) {
  const { searchTerm } = useOutletContext<OutletContext>();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const { recipes, toggleLike, toggleBookmark } = useListStore();

  const selectedItem = recipes.find((item) => item.id === selectedId);

  /** 1️⃣ 타입별 필터 */
  const displayData = recipes.filter((item) => {
    if (type === "좋아요 누른 레시피") return item.isLiked;
    return item.bookmark;
  });

  /** 2️⃣ 검색어 필터 */
  const filteredData = displayData.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleIconClick = (id: number) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedId !== null) {
      if (type === "좋아요 누른 레시피") {
        toggleLike(selectedId);
      } else {
        toggleBookmark(selectedId);
      }
    }
    setIsModalOpen(false);
    setSelectedId(null);
  };

  return (
    <>
      <div className="w-[361px] mx-auto mt-[18px] pb-10">
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <ListItem
              key={item.id}
              type={type}
              img={item.img}
              title={item.title}
              likes={item.likes}
              isSelected={selectedId === item.id}
              onSelect={() => setSelectedId(item.id)}
              onIconClick={() => handleIconClick(item.id)}
            />
          ))
        ) : (
          <p className="mt-10 text-zinc-400 typo-body text-center">
            검색 결과가 없습니다.
          </p>
        )}
      </div>

      {/* ✅ 모달은 스크롤 밖 */}
      {isModalOpen && (
        <DoublecheckModal
          title={selectedItem ? selectedItem.title : ""}
          description={
            type === "좋아요 누른 레시피"
              ? "좋아요를 취소하시겠어요?"
              : "북마크 목록에서 삭제할까요?"
          }
          onClose={() => {
            setIsModalOpen(false);
            setSelectedId(null);
          }}
          onConfirm={handleConfirmDelete}
          isOpen={isModalOpen}
        />
      )}
    </>
  );
}
