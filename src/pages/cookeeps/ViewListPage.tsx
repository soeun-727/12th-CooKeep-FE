import { useState } from "react";
import TextField from "../../components/ui/TextField";
import { searchIcon } from "../../assets";
import { like, bookmark } from "../../assets";
import ListItem from "../../components/cookeeps/lists/ListItem";
import DoublecheckModal from "../../components/ui/DoublecheckModal";
import { useListStore } from "../../stores/useListStore";

interface Props {
  type: string;
  description: string;
}
export default function ViewListPage({ type, description }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { recipes, toggleLike, toggleBookmark } = useListStore();
  const selectedItem = recipes.find((item) => item.id === selectedId);
  const displayData = recipes.filter((item) => {
    if (type === "좋아요 누른 레시피") {
      return item.isLiked === true;
    }
    return item.bookmark === true;
  });
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
    <div className="flex flex-col items-center h-screen overflow-hidden">
      <div className="flex flex-col items-center flex-shrink-0">
        <div
          className={`mt-12 [&_p]:hidden !w-[361px] [&_input]:border-none [&_input]:focus:outline-none [&_input::placeholder]:text-zinc-500
                  shadow-[0_4px_16px_-10px_rgba(0,0,0,0.25)] ${
                    searchTerm ? "[&_input]:bg-white" : "[&_input]:bg-[#EBEDF1]"
                  }`}
        >
          <TextField
            value={searchTerm}
            placeholder="찾으시는 레시피가 있나요?"
            onChange={(e: any) => {
              const value = e.target ? e.target.value : e;
              setSearchTerm(value);
            }}
            rightIcon={<img src={searchIcon} className="" />}
          />
        </div>
        <div className="w-[137px] h-8 rounded-[6px] py-[2px] px-2 flex gap-1 bg-black items-center justify-center mt-[29px]">
          <img
            src={type === "좋아요 누른 레시피" ? like : bookmark}
            className="w-[18px]"
          />
          <span className="typo-caption text-white">{type}</span>
        </div>
        <span className="typo-caption text-zinc-500 mt-[6px]">
          {description}
        </span>
      </div>

      <div className="w-[361px] mt-[18px] flex-1 overflow-y-auto no-scrollbar pb-10 flex flex-col items-center">
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <ListItem
              type={type}
              key={item.id}
              id={item.id}
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
      {isModalOpen && (
        <DoublecheckModal
          title={selectedItem ? `${selectedItem.title}` : ""}
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
    </div>
  );
}
