import { Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";

import ResetPassword from "./components/auth/find/ResetPassword";
import InitialPage from "./pages/auth/InitialPage";
import OnboardingPage from "./pages/auth/OnboardingPage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import FindPage from "./pages/auth/FindPage";
//signup 아직 없음
//findpw도 아직 없음

export default function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<InitialPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/find" element={<FindPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        {/* <Route path="/findpw" element={<Find />} */}
      </Routes>
    </AppLayout>
  );
}
