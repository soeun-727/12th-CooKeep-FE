import { Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";

import ResetPassword from "./components/auth/find/ResetPassword";
import InitialPage from "./pages/auth/InitialPage";
import OnboardingPage from "./pages/auth/OnboardingPage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import FindPage from "./pages/auth/FindPage";
import RequireFindAuth from "./components/auth/find/RequireFindAuth";
import FindLayout from "./components/auth/find/FindLayout";
import SettingsPage from "./pages/auth/SettingsPage";
import EditPhonePage from "./components/settings/pages/EditPhonePage";

//signup 아직 없음

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

        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/settings/phone" element={<EditPhonePage />} />
      </Routes>
    </AppLayout>
  );
}
