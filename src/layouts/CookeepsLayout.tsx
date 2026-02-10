// layouts/CookeepsLayout.tsx
import { Outlet } from "react-router-dom";

export default function CookeepsLayout() {
  return (
    <div className="h-[100dvh] overflow-y-auto no-scrollbar">
      <Outlet />
    </div>
  );
}
