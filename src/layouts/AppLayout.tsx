type Props = {
  children: React.ReactNode;
};
// AppLayout.tsx
export default function AppLayout({ children }: Props) {
  return (
    <div className="min-h-[100dvh] bg-gray-100 flex justify-center">
      <div
        className="
          relative
          w-full
          max-w-[450px]
          bg-[#FAFAFA]
          transform translate-x-0
        "
      >
        {children}
      </div>
    </div>
  );
}
