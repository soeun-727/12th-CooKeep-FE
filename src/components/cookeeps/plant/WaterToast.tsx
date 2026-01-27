interface WaterToastProps {
  message: string;
  isVisible: boolean;
}

export default function WaterToast({ message, isVisible }: WaterToastProps) {
  if (!isVisible) return null;

  return (
    <div
      className="
        absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        inline-flex items-center justify-center gap-2
        px-5 py-1 rounded-full
        bg-white/75
        shadow-[0_1px_8.2px_-2px_rgba(17,17,17,0.25)]
        text-[#1FC16F] font-bold text-[12px] text-center
        pointer-events-none
        animate-fade-in-out
      "
    >
      {message}
    </div>
  );
}
