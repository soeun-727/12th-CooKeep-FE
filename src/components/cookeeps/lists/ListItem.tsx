import { likeGray, bookmarkGray } from "../../../assets";

interface ItemProps {
  id: number;
  type: string;
  img: string;
  title: string;
  likes?: number;
  bookmark?: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
  onIconClick?: (e: React.MouseEvent) => void;
}

const ListItem: React.FC<ItemProps> = ({
  id,
  type,
  img,
  title,
  likes,
  bookmark,
  isSelected = false,
  onSelect,
  onIconClick,
}) => {
  const handleIconClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 부모의 onSelect가 실행되지 않도록 방지
    if (onIconClick) onIconClick(e);
  };
  return (
    <div
      onClick={onSelect}
      className={`w-[335px] h-12 rounded-[6px] flex items-center justify-between px-2 py-[10px] ${isSelected ? "bg-gray-200" : "bg-[#FAFAFA]"}`}
    >
      <img src={img} alt={title} className="w-[65px] h-[42px] rounded-[6px]" />
      <span className="w-[190px] typo-body2 text-left">{title}</span>
      {type === "좋아요 누른 레시피" ? (
        <button
          onClick={handleIconClick}
          className="flex items-center justify-between w-[38px] active:scale-90 transition-transform"
        >
          <img src={likeGray} alt="like" className="w-3" />
          <span className="typo-caption text-zinc-500">{likes}</span>
        </button>
      ) : (
        <button
          onClick={handleIconClick}
          className="active:scale-90 transition-transform pr-2"
        >
          <img src={bookmarkGray} alt="bookmark" className="w-7" />
        </button>
      )}
    </div>
  );
};

export default ListItem;
