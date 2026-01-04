import LoginFooter from "./LoginFooter";
import LoginMain from "./LoginMain";

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col">
      <LoginMain />
      <LoginFooter />
    </div>
  );
}
