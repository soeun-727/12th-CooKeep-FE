import TextField from "../../ui/TextField";
import searchIcon from "../../../assets/fridge/search.svg";
import searchOnIcon from "../../../assets/fridge/search_on.svg";
import { useIngredientStore } from "../../../stores/useIngredientStore";

//재료 검색
export default function Search() {
  const { searchTerm, setSearchTerm } = useIngredientStore();
  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };
  const hasText = searchTerm.trim().length > 0;
  return (
    <div className="w-full pb-[26px]">
      <div className="w-[361px] mx-auto transition-all duration-200">
        <div
          className={`
          relative
          w-full 
          [&_p]:hidden
          [&_input]:w-full
          [&_input]:border-none 
          [&_input]:outline-none 
          [&_input]:shadow-sm 
          [&_input::placeholder]:text-[#7D7D7D]
          ${hasText ? "[&_input]: bg-white" : "[&_input]:bg-[#EBEDF1] "}
      `}
        >
          <TextField
            value={searchTerm}
            type="text"
            placeholder="찾으시는 재료가 있나요? (ex. 고구마, 초코우유...)"
            onChange={handleSearch}
            rightIcon={
              <div className="flex items-center justify-center transition-opacity duration-200">
                <img
                  src={hasText ? searchOnIcon : searchIcon}
                  alt="search"
                  className={hasText ? "cursor-pointer" : "cursor-default"}
                />
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
}
