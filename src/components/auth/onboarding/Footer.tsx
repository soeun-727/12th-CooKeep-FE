//props로 다음과 이전이 어딘지 받으면 될 듯

import Button from "../../ui/Button";

export default function Footer() {
  return (
    <div className="fixed bottom-0 left-0 pb-[34px] w-full flex flex-col items-center justify-center gap-2">
      <Button size="S" className="bg-[var(--color-green-deep)]">
        다음
      </Button>
      <Button size="S" className="bg-gray-300">
        이전
      </Button>
      <button className="typo-caption text-gray-500">질문 건너뛰기</button>
    </div>
  );
}
