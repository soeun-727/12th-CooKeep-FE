import { useEffect } from "react";

export const useThemeColor = (color: string) => {
  useEffect(() => {
    // 1. theme-color 메타 태그 찾기
    let meta = document.querySelector('meta[name="theme-color"]');

    // 2. 태그가 없으면 새로 생성
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "theme-color");
      document.head.appendChild(meta);
    }

    // 3. 색상 업데이트
    meta.setAttribute("content", color);
  }, [color]);
};
