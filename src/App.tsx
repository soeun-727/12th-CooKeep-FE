// App.tsx
import Initial from "./components/auth/Initial";

export default function App() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-200">
      <main className="relative w-[393px] h-[852px] bg-white shadow-2xl overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          <Initial />
        </div>
      </main>
    </div>
  );
}
