// import { useState } from "react";
import likeIcon from "../../../assets/cookeeps/main/like_cookeeps.svg";
import saveIcon from "../../../assets/cookeeps/main/save_cookeeps.svg";

// 저장눌렀을때 아이콘 확정되면 수정

interface Props {
  userName: string;
}

export default function RecipeDetailUserMeta({ userName }: Props) {
  // const [liked, setLiked] = useState(false);
  // const [saved, setSaved] = useState(false);

  return (
    <div
      className="
    flex justify-between items-center
    w-full p-1
  "
    >
      {/* 유저 pill */}
      <div
        className="
  flex items-center
  h-[20px]
  px-3
  gap-1
  rounded-full
  bg-[#202020]
"
      >
        <span className="text-[#32E389] text-[12px] font-medium">
          {userName}
        </span>
        <span className="text-white text-[12px] font-medium">님의 레시피</span>
      </div>

      {/* 버튼 영역 */}
      <div className="flex items-center gap-1 sm:gap-2">
        <button className="w-[28px] h-[28px] flex items-center justify-center rounded-full">
          <img src={likeIcon} alt="좋아요" className="w-5 h-5" />
        </button>

        <button className="w-[28px] h-[28px] flex items-center justify-center rounded-full">
          <img src={saveIcon} alt="저장" className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
