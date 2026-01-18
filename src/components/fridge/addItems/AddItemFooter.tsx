import Button from "../../ui/Button";
import RecentlyAdded from "./RecentlyAdded";
import Selected from "./Selected";
interface AddItemFooterProps {
  selectedItems: any[];
  historyItems: any[];
  onReset: () => void;
  onSubmit: () => void;
  onSelect: (item: any) => void;
}
export default function AddItemFooter({
  selectedItems,
  historyItems,
  onReset,
  onSubmit,
  onSelect,
}: AddItemFooterProps) {
  return (
    <div className="fixed bottom-[103px] left-1/2 -translate-x-1/2 z-50 flex flex-col items-center">
      <RecentlyAdded historyItems={historyItems} onAdd={onSelect} />
      <div className="relative z-20">
        <Selected selectedItems={selectedItems} />
      </div>
      <div className="flex gap-[6px] w-[300px] mt-[14px]">
        <div className="flex-1">
          <Button
            size="S"
            variant="black"
            onClick={onReset}
            className="!w-full"
          >
            선택 초기화
          </Button>
        </div>
        <div className="flex-1">
          <Button
            size="S"
            variant="green"
            onClick={onSubmit}
            disabled={selectedItems.length === 0}
            className="!w-full"
          >
            재료 추가하기
          </Button>
        </div>
      </div>
    </div>
  );
}
