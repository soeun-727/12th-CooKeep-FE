// src/components/auth/AuthHeader.tsx
import Logo from "../../assets/Logo_black.svg";

const AuthHeader = () => {
  return (
    <header className="fixed top-0 left-0 z-50 w-full flex items-start justify-between px-4 py-3">
      <img src={Logo} alt="CooKeep logo" className="w-[70px] h-[20px]" />

      <p className="flex items-center gap-[6px] typo-label">
        <span className="text-[#7D7D7D]">맛있는 습관이 이어지는 곳,</span>
        <span className="text-[var(--color-green-deep)]">쿠킵</span>
      </p>
    </header>
  );
};

export default AuthHeader;
