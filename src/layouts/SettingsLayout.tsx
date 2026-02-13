import { Outlet, useLocation, useNavigate } from "react-router-dom";
import BackHeader from "../components/ui/BackHeader";
import { useRef } from "react";

export default function SettingsLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  // 최초 진입 경로 저장
  const initialFrom = useRef(location.state?.from);

  const handleBack = () => {
    if (location.pathname === "/settings") {
      navigate(initialFrom.current || "/fridge");
    } else {
      navigate(-1);
    }
    // if (location.pathname === "/settings") {
    //   if (initialFrom.current) {
    //     navigate(initialFrom.current);
    //   } else {
    //     navigate(-1);
    //   }
    // } else {
    //   navigate(-1);
    // }
  };

  return (
    <div className="min-h-screen">
      <BackHeader title="회원정보" onBack={handleBack} />
      <Outlet />
    </div>
  );
}
