type Props = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      {/* 가짜 viewport */}
      <div
        className="
          relative
          w-full
          max-w-[450px]
          min-h-screen
          bg-[#FAFAFA]
          overflow-x-hidden
        "
      >
        {children}
      </div>
    </div>
  );
}
