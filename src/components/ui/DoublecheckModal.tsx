import React from "react";

interface DoublecheckModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
}

const DoublecheckModal: React.FC<DoublecheckModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  onConfirm,
  confirmText = "네",
  cancelText = "아니오",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center bg-[#11111180]">
      <div className="absolute inset-0" onClick={onClose}></div>
      <div className="relative w-[254px] h-43 bg-white rounded-[10px] shadow-xl flex flex-col items-center">
        <h2 className="typo-body1 w-[198px] h-6 mb-2 text-center font-bold text-neutral-900 mt-[35px]">
          {title}
        </h2>
        <p className="mb-4 typo-body2 w-[198px] h-5 text-center font-medium text-neutral-900">
          {description}
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="typo-label w-[95px] h-11 text-white bg-black rounded-[10px]"
          >
            {confirmText}
          </button>
          <button
            onClick={onClose}
            className="typo-label w-[95px] h-11 text-white bg-stone-300 rounded-[10px]"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoublecheckModal;
