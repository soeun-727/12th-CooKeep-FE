import MyCookeepHeader from "./MyCookeepHeader";
import { groundImg, refreshIcon, renameIcon } from "../../../assets";

export default function Profile() {
  //나중에 값 가져와야 함
  const goal = "ex. 주 122312434회 요리하기!";
  const nickname = "요리잘하는 쿠쿠";
  const daysCookeep = "365";
  return (
    <div className="flex flex-col items-center justify-center">
      {/* 헤더 */}
      <div
        className="w-full h-[369px] bg-gradient-to-b from-[#32E389] to-[#1FC16F] rounded-b-[36px] 
        flex flex-col items-center justify-center"
      >
        <MyCookeepHeader />
        {/* 식물 사진 */}
        <div className="relative inline-block overflow-visible">
          <img
            src={groundImg}
            alt="profileBackground"
            className="w-[155px] p-6 rounded-full object-cover"
          />
          {/* 새로 고침 버튼 */}
          <button className="absolute bottom-6 right-6 ">
            <img src={refreshIcon} alt="refresh" className="w-[22px] " />
          </button>
        </div>
        <p className="typo-h2 text-white -mt-2">{nickname}</p>
        <div className="flex items-center gap-px h-5 px-3 bg-[#E6FBEB] typo-caption rounded-[100px] mt-[7px]">
          <span className="text-(--color-green)">{daysCookeep}</span>
          <span className="text-zinc-500">일 째 Cookeep</span>
        </div>
        <div className="bg-[#1DAD64] p-3 w-[361px] h-12 flex items-center justify-between gap-3 rounded-[12px] shadow-[0px_4px_16px_-10px_rgba(0,0,0,0.25)] mt-[23px]">
          <span className="text-green-300 typo-body2">
            이번주 목표는... {goal}
          </span>
          <button className="w-6">
            <img
              src={renameIcon}
              alt="rename"
              className="brightness-0 invert-[100%] w-4"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
