import { Outlet, useNavigate } from "react-router-dom";
import BackHeader from "../components/ui/BackHeader";

export default function SettingsLayout() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <BackHeader title="회원정보" onBack={() => navigate(-1)} />
      <Outlet />
    </div>
  );
}
