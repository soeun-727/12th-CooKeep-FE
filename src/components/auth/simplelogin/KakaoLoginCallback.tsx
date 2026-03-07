import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../stores/useAuthStore";

export default function KakaoLoginCallback() {
  const navigate = useNavigate();
  const loginSocial = useAuthStore((state) => state.loginSocial);
  const hasCalledAPI = useRef(false);

  useEffect(() => {
    const handleLogin = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI || "";

      if (!code || hasCalledAPI.current) return;
      hasCalledAPI.current = true;

      try {
        const res = await fetch(
          `https://api.cookeep.store/api/auth/login/kakao?code=${code}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`,
        );

        if (!res.ok) {
          const errorText = await res.text();
          console.error("서버 응답 에러 상세:", errorText);
          throw new Error(`서버 에러 발생: ${res.status}`);
        }

        const response = await res.json();

        if (response.status === "OK" || response.status === 200) {
          const { data } = response;

          // 1. 모든 유저 정보(상태 포함)를 스토어에 먼저 저장
          loginSocial({
            userId: data.userId,
            accessToken: data.accessToken || "",
            refreshToken: data.refreshToken || "",
            nextStep: data.nextStep,
            userStatus: data.userStatus,
          });

          // 2. [추가] userStatus에 따른 예외 처리 분기
          // 백엔드에서 정의한 값(예: BLOCKED, DELETED 등)에 따라 처리하세요.
          if (data.userStatus === "BLOCKED") {
            alert("서비스 이용이 제한된 계정입니다.");
            navigate("/login");
            return;
          }

          // 3. 정상 상태일 경우 nextStep에 따른 페이지 이동
          // KakaoLoginCallback.tsx 내부 navigate 부분 수정
          if (data.nextStep === "TERMS") {
            navigate("/simplelogin", { replace: true });
          } else if (data.nextStep === "ONBOARDING") {
            navigate("/onboarding", { replace: true });
          } else {
            navigate("/fridge", { replace: true });
          }
        }
      } catch (err) {
        console.error("로그인 에러:", err);
        // StrictMode 등으로 인한 중복 에러 메시지 방지를 위해 체크
        if (hasCalledAPI.current) {
          alert("로그인 처리 중 오류가 발생했습니다.");
        }
      }
    };

    handleLogin();
  }, [navigate, loginSocial]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <p className="typo-body">로그인 중입니다...</p>
    </div>
  );
}
