import line from "../../../assets/login/Line.png";
import Line from "../../../assets/login/Horizontal-Line.png";
import Kakao from "../../../assets/login/Kakao.svg";
import Google from "../../../assets/login/Google.svg";
import { useNavigate } from "react-router-dom";

export default function LoginFooter() {
  const navigate = useNavigate();
  const handleKakaoLogin = () => {
    const CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;
    const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&prompt=consent`;
    window.location.href = KAKAO_AUTH_URL;
  };

  const handleGoogleLogin = () => {
    const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const REDIRECT_URI = import.meta.env.VITE_GOOGLE_REDIRECT_URI;

    const GOOGLE_AUTH_URL =
      `https://accounts.google.com/o/oauth2/v2/auth` +
      `?client_id=${CLIENT_ID}` +
      `&redirect_uri=${REDIRECT_URI}` +
      `&response_type=code` +
      `&scope=openid email profile` +
      `&access_type=offline` +
      `&prompt=consent`;

    window.location.href = GOOGLE_AUTH_URL;
  };

  return (
    <>
      {/* 하단 메뉴 */}
      <div className="flex items-center justify-center gap-[18px] mt-[39px]">
        <button className="typo-label" onClick={() => navigate("/findpw")}>
          비밀번호 찾기
        </button>
        <img src={line} alt="구분선" />
        <button className="typo-label" onClick={() => navigate("/signup")}>
          회원가입
        </button>
      </div>

      {/* SNS 로그인 */}
      <div className="flex justify-center items-center gap-[22px] mt-[30px]">
        <img src={Line} alt="구분선" />
        <span className="typo-caption">SNS 계정으로 로그인</span>
        <img src={Line} alt="구분선" />
      </div>

      <div className="flex flex-col items-center justify-center gap-3 mt-7">
        {/* 간편 로그인 미구현  */}
        <button onClick={handleGoogleLogin}>
          <img src={Google} alt="구글 로고" className="w-50" />
        </button>

        <button onClick={handleKakaoLogin}>
          <img src={Kakao} alt="카카오 로고" className="w-50" />
        </button>
      </div>

      {/* 최하단 */}
      <div className="mt-8 flex flex-col items-center justify-center">
        <div className="flex justify-center gap-4">
          <span className="typo-caption">전화번호를 변경했어요</span>
          {/* 현재 페이지 미구현 */}
          <button
            onClick={() => navigate("/support")}
            className="typo-caption underline"
          >
            고객센터
          </button>
        </div>
        <button
          onClick={() => navigate("/fridge")}
          className="mt-5 typo-body1 font-bold text-[var(--color-green-deep)] mb-[34px]"
        >
          일단 둘러보기
          {/* 현재 페이지 미구현 */}
        </button>
      </div>
    </>
  );
}
