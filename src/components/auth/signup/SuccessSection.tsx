import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";

export default function SuccessSection() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center animate-fade-in">
      <div className="text-6xl mb-6">🎉</div>
      <h2 className="text-2xl font-bold mb-2">가입을 축하합니다!</h2>
      <p className="text-gray-600 mb-10">
        이제 모든 준비가 끝났습니다.
        <br />
        지금 바로 서비스를 시작해보세요.
      </p>

      <Button size="L" className="w-full" onClick={() => navigate("/")}>
        시작하기
      </Button>
    </div>
  );
}
