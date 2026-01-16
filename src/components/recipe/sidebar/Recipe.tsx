import liked from "../../../assets/recipe/liked.svg";
import unliked from "../../../assets/recipe/unliked.svg";
import rename from "../../../assets/recipe/rename.svg";
import deleteIcon from "../../../assets/recipe/delete.svg";

interface RecipeProps {
  isLiked: boolean;
  name: string;
  onClick?: () => void;
}

const Recipe: React.FC<RecipeProps> = ({ isLiked = false, name, onClick }) => {
  return (
    <div className="flex w-[277px] h-[34px] justify-between">
      <button>
        <img
          src={isLiked ? liked : unliked}
          alt="like"
          className="w-[18px] px-2"
        />
      </button>

      <button>
        <span className="typo-body2 w-[166px] text-left truncate pr-9[px]">
          {name}
        </span>
      </button>

      <button>
        <img src={rename} alt="rename" className="w-[14px] p-[10px]" />
      </button>

      <button>
        <img src={deleteIcon} alt="delete" className="w-[14px] px-[10px]" />
      </button>
    </div>
  );
};

export default Recipe;
