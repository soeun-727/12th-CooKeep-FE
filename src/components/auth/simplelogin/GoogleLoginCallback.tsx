import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../stores/useAuthStore";

export default function GoogleLoginCallback() {
  const navigate = useNavigate();
  const loginSocial = useAuthStore((state) => state.loginSocial);
  const hasCalledAPI = useRef(false);

  useEffect(() => {
    const handleLogin = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      const REDIRECT_URI = import.meta.env.VITE_GOOGLE_REDIRECT_URI || "";

      if (!code || hasCalledAPI.current) return;
      hasCalledAPI.current = true;

      try {
        const res = await fetch(
          `https://api.cookeep.store/api/auth/login/google?code=${code}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`,
        );

        if (!res.ok) throw new Error();

        const { data } = await res.json();

        loginSocial({
          userId: data.userId,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          nextStep: data.nextStep,
          userStatus: data.userStatus,
        });

        if (data.userStatus === "BLOCKED") {
          alert("차단된 계정입니다.");
          navigate("/login");
          return;
        }

        if (data.nextStep === "TERMS") navigate("/simplelogin");
        else if (data.nextStep === "ONBOARDING") navigate("/onboarding");
        else navigate("/fridge");
      } catch {
        alert("구글 로그인 실패");
      }
    };

    handleLogin();
  }, [navigate, loginSocial]);

  return (
    <div className="flex h-screen items-center justify-center">
      로그인 중...
    </div>
  );
}
