import TextField from "../../ui/TextField";
import searchIcon from "../../../assets/fridge/search.svg";
import { useState } from "react";

//재료 검색
export default function Search() {
  const [keyword, setKeyword] = useState("");

  const handleSearch = (value: string) => {
    setKeyword(value);
    // 여기에 검색 로직 추가, 부모 컴포넌트로 값 전달
    console.log("검색어:", value);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="[&_input]:border-none [&_input]:bg-white [&_input]:shadow-sm">
        <TextField
          value={keyword}
          type="text"
          rightIcon={<img src={searchIcon} alt="search" />}
          placeholder="찾으시는 재료가 있나요? (ex. 고구마, 초코우유...)"
          onChange={handleSearch}
        />
      </div>
    </div>
  );
}
