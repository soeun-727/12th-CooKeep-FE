import line from "../../../assets/login/Line.png";
import Line from "../../../assets/login/Horizontal-Line.png";
import Kakao from "../../../assets/login/Kakao.png";
import Google from "../../../assets/login/Google.svg";
import { useNavigate } from "react-router-dom";

export default function LoginFooter() {
  const navigate = useNavigate();
  return (
    <>
      {/* 하단 메뉴 */}
      <div className="flex items-center justify-center gap-[18px] mt-[39px]">
        <button className="typo-label" onClick={() => navigate("/findpw")}>
          비밀번호 찾기
        </button>
        <img src={line} alt="구분선" />
        <button className="typo-label">회원가입</button>
      </div>

      {/* SNS 로그인 */}
      <div className="flex justify-center items-center gap-[22px] mt-[30px]">
        <img src={Line} alt="구분선" />
        <span className="typo-caption">SNS 계정으로 로그인</span>
        <img src={Line} alt="구분선" />
      </div>

      <div className="flex justify-center gap-3 mt-7">
        {/* 간편 로그인 미구현  */}
        <img src={Google} alt="구글 로고" />
        <img src={Kakao} alt="카카오 로고" />
      </div>

      {/* 최하단 */}
      <div className="mt-[62px] flex flex-col items-center justify-center">
        <div className="flex justify-center gap-4">
          <span className="typo-caption">전화번호를 변경했어요</span>
          {/* 현재 페이지 미구현 */}
          <button className="typo-caption underline">고객센터</button>
        </div>
        <button className="mt-5 typo-body1 font-bold text-[var(--color-green-deep)]">
          일단 둘러보기
          {/* 현재 페이지 미구현 */}
        </button>
      </div>
    </>
  );
}
