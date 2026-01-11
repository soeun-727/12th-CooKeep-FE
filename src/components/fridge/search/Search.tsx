import TextField from "../../ui/TextField";
import searchIcon from "../../../assets/fridge/search.svg";
import searchOnIcon from "../../../assets/fridge/search_on.svg";
import { useState } from "react";

//재료 검색
export default function Search() {
  const [keyword, setKeyword] = useState("");

  const handleSearch = (value: string) => {
    setKeyword(value);
  };

  const onSearchSubmit = () => {
    if (keyword.trim().length > 0) {
      console.log("검색 실행:", keyword);
      // 여기에 실제 검색 로직 추가
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="[&_input]:border-none [&_input]:outline-none [&_input]:shadow-sm">
        <TextField
          value={keyword}
          type="text"
          placeholder="찾으시는 재료가 있나요? (ex. 고구마, 초코우유...)"
          onChange={handleSearch}
          rightIcon={
            <button
              onClick={onSearchSubmit}
              disabled={keyword.trim().length === 0}
              className="flex items-center justify-center transition-opacity duration-200"
            >
              <img
                src={keyword.trim().length > 0 ? searchOnIcon : searchIcon}
                alt="search"
                className={
                  keyword.trim().length > 0
                    ? "cursor-pointer"
                    : "cursor-default"
                }
              />
            </button>
          }
        />
      </div>
    </div>
  );
}
