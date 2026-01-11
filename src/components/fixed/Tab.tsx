interface TabProps {
  image: string;
  selectedImage: string;
  title: string;
  isSelected?: boolean;
  onClick?: () => void;
}

const Tab: React.FC<TabProps> = ({
  image,
  selectedImage,
  title,
  isSelected = false,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex flex-1 flex-col items-center justify-center transition-colors h-14 ${
        isSelected ? "bg-gray-100" : "bg-white"
      }`}
    >
      <img
        className="w-[25px] h-[25px]"
        src={isSelected ? selectedImage : image}
      />
      <span className="font-semibold text-[10px] leading-3 tracking-[0.1px] text-center">
        {title}
      </span>
    </button>
  );
};

export default Tab;
