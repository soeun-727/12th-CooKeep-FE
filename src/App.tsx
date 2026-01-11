import { Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";

import InitialPage from "./pages/auth/InitialPage";
import OnboardingPage from "./pages/auth/OnboardingPage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import FindPage from "./pages/auth/FindPage";
import ResetPassword from "./components/auth/find/ResetPassword";
import RequireFindAuth from "./components/auth/find/RequireFindAuth";
import FindLayout from "./components/auth/find/FindLayout";

export default function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<InitialPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route element={<FindLayout />}>
          <Route path="/findpw" element={<FindPage />} />
          <Route
            path="/reset-password"
            element={
              <RequireFindAuth>
                <ResetPassword />
              </RequireFindAuth>
            }
          />
        </Route>
      </Routes>
    </AppLayout>
  );
}
