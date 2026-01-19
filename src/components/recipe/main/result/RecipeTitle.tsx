import { useState } from "react";
import tempIcon from "../../../../assets/recipe/main/temp_recipe_title.svg";
import unlikedIcon from "../../../../assets/recipe/unliked.svg";
import likedIcon from "../../../../assets/recipe/liked.svg";

interface Props {
  name: string;
}

export default function RecipeTitle({ name }: Props) {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => setLiked((prev) => !prev);

  return (
    <div
      className="
        flex items-center justify-center self-stretch
        w-full max-w-[361px]
        bg-white
        rounded-[6px]
        shadow-[0_4px_16px_-10px_rgba(0,0,0,0.25)]
        p-4
        mx-auto
      "
      style={{ gap: "8px" }}
    >
      {/* 왼쪽 이미지 */}
      <img
        src={tempIcon}
        alt="레시피 아이콘"
        className="flex-shrink-0 w-[36px] h-[36px]"
      />

      {/* 레시피 이름 */}
      <h2
        className="flex-1 text-[18px] font-semibold leading-[26px] text-[#202020]"
        style={{ flex: "1 0 0" }}
      >
        {name}
      </h2>

      {/* 즐겨찾기 버튼 */}
      <button
        onClick={toggleLike}
        className="flex-shrink-0 w-[22px] h-[18px] aspect-square"
      >
        <img
          src={liked ? likedIcon : unlikedIcon}
          alt={liked ? "즐겨찾기됨" : "즐겨찾기 안됨"}
          className="object-contain w-full h-full"
        />
      </button>
    </div>
  );
}
