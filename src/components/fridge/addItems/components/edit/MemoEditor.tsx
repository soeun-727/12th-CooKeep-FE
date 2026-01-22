import { useState } from "react";
import Button from "../../../../ui/Button";

interface MemoEditorProps {
  value: string;
  onSave: (val: string) => void;
}

export default function MemoEditor({ value, onSave }: MemoEditorProps) {
  const [text, setText] = useState(value || "");

  return (
    <div className="flex flex-col items-center mt-[18px] mb-[31px]">
      <textarea
        autoFocus
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="메모를 입력해주세요"
        className="w-[361px] h-[186px] p-3 rounded-[10px] border border-[#D1D1D1] text-center outline-none resize-none typo-body"
      />

      {/* 저장 버튼으로 명시적 저장 */}
      <Button
        onClick={() => onSave(text)}
        className="mt-3"
        size="S"
        type="submit"
      >
        저장
      </Button>
    </div>
  );
}
