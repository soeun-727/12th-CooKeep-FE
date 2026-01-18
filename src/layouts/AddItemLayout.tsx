// src/layouts/AddItemLayout.tsx
import { Outlet, useNavigate } from "react-router-dom";
import BackHeader from "../components/ui/BackHeader";

export default function AddItemLayout() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
      <BackHeader title="재료 등록" onBack={() => navigate(-1)} />

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
