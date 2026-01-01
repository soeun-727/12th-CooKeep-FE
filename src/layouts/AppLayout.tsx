type Props = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: Props) {
  return (
    <div className="w-screen min-h-[100dvh] flex justify-center bg-gray-100">
      <div
        className="
          w-full
          max-w-[450px]
        bg-white
          min-h-[100dvh]
        "
      >
        {children}
      </div>
    </div>
  );
}
