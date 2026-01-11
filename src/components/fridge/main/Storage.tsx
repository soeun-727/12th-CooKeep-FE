//Fridge, Freezer, Pantry items
import plus from "../../../assets/fridge/plus.svg";
interface StorageProps {
  category: string;
  image: string;
}
export default function Storage({ category, image }: StorageProps) {
  return (
    <div className="relative w-full max-w-[393px] min-h-[173px] mx-auto z-0">
      {/* 배경 */}
      <div className="absolute inset-0 -z-10 flex flex-col overflow-hidden">
        <div className="w-full h-[115px] rounded-t-[36px] bg-[#BFC6D740]" />
        <div className="bg-[#C8CFE2] h-12" />
        <div className="bg-[#ADB4C7] h-[10px]" />
      </div>

      {/* 컨텐츠 */}
      <div className="relative z-10 pl-[22px] pr-[22px] pt-[5px]">
        <div className="flex justify-between w-full h-10 items-center">
          <div className="flex items-center bg-neutral-800 rounded-[6px] h-[22px] px-2 gap-1 text-white text-3">
            <img src={image} alt="" />
            <span>{category}</span>
          </div>

          <div className="flex items-center gap-1 h-10">
            <button>
              <span className="text-[var(--color-green-deep)] text-3 font-semibold leading-4">
                전체보기
              </span>
            </button>
            <button>
              <img src={plus} className="w-4 h-4" alt="plus" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
