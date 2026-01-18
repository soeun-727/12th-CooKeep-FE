interface StepMessageProps {
  message: string;
  index: number;
  icon: string;
}

export default function StepMessage({
  message,
  index,
  icon,
}: StepMessageProps) {
  return (
    <div
      className="flex items-center gap-3 p-3 border border-[#32E389] rounded-md bg-white"
      style={{
        animation: `fadeIn 0.5s forwards`,
        animationDelay: `${index * 0.5}s`,
        boxShadow: "0 4px 16px -10px rgba(0,0,0,0.25)",
      }}
    >
      <img src={icon} className="w-6 h-6" alt="check" />
      <span className="flex-1 text-[#202020] font-medium text-sm leading-5">
        {message}
      </span>
    </div>
  );
}
