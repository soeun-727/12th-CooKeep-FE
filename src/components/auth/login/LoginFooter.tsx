import line from "../../../assets/login/Line.png";
import Line from "../../../assets/login/Horizontal-Line.png";
import Kakao from "../../../assets/login/Kakao.png";
import Google from "../../../assets/login/Google.svg";

export default function LoginFooter() {
  return (
    <>
      {/* 하단 메뉴 */}
      <div className="flex items-center justify-center gap-[18px] mt-[39px]">
        <button className="typo-label">이메일 찾기</button>
        <img src={line} alt="구분선" />
        <button className="typo-label">비밀번호 찾기</button>
        <img src={line} alt="구분선" />
        <button className="typo-label">회원가입</button>
      </div>

      {/* SNS 로그인 */}
      <div className="flex justify-center items-center gap-[22px] mt-[30px]">
        <img src={Line} alt="구분선" />
        <span className="typo-caption">SNS 계정으로 로그인</span>
        <img src={Line} alt="구분선" />
      </div>

      <div className="flex justify-center gap-[12px] mt-[28px]">
        <img src={Google} alt="구글 로고" />
        <img src={Kakao} alt="카카오 로고" />
      </div>

      {/* 최하단 */}
      <div className="mt-auto pb-[24px]">
        <div className="flex justify-center gap-[16px] mb-[34px]">
          <span className="typo-caption">전화번호를 변경했어요</span>
          <span className="typo-caption underline">고객센터</span>
        </div>
        <button className="block mx-auto mt-6 typo-body1 font-bold text-[var(--color-green-deep)]">
          일단 둘러보기
        </button>
      </div>
    </>
  );
}
