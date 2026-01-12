// src/components/auth/settings/Settings.tsx
import { useNavigate } from "react-router-dom";
import BackHeader from "../ui/BackHeader";
import SettingsMain from "./SettingsMain";

export default function Settings() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <BackHeader title="회원정보" onBack={() => navigate(-1)} />
      <SettingsMain />
    </div>
  );
}
