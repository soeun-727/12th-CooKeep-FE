type Props = {
  children: React.ReactNode;
};
// AppLayout.tsx
export default function AppLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div
        className="
          relative
          w-full
          max-w-[450px]
          min-h-screen
          bg-[#FAFAFA]
        "
      >
        {children}
      </div>
    </div>
  );
}
