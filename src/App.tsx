import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";

import InitialPage from "./pages/auth/InitialPage";
import OnboardingPage from "./pages/auth/OnboardingPage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import FindPage from "./pages/auth/FindPage";
import ResetPassword from "./components/auth/find/ResetPassword";
import RequireFindAuth from "./components/auth/find/RequireFindAuth";
import FindLayout from "./components/auth/find/FindLayout";

import SettingsPage from "./pages/settings/SettingsPage";
import EditPhonePage from "./pages/settings/EditPhonePage";
import SettingsLayout from "./layouts/SettingsLayout";
import EditEmailPage from "./pages/settings/EditEmailPage";
import EditPasswordPage from "./pages/settings/EditPasswordPage";
import VerifyLayout from "./layouts/VerifyLayout";
import EditPasswordPhoneSection from "./components/settings/sections/EditPasswordPhoneSection";

import FridgePage from "./pages/fridge/FridgePage";
import RecipePage from "./pages/recipe/RecipePage";
import Layout from "./components/Layout";

import SimpleLoginAgreementPage from "./pages/auth/SimpleLoginAgreementPage";
import SupportPage from "./pages/settings/SupportPage";
import FaqPage from "./pages/settings/FaqPage";
import NoticePage from "./pages/settings/NoticePage";

export default function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<InitialPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/simplelogin" element={<SimpleLoginAgreementPage />} />
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

        <Route path="/settings" element={<SettingsLayout />}>
          <Route index element={<SettingsPage />} />
          <Route path="phone" element={<EditPhonePage />} />
          <Route path="email" element={<EditEmailPage />} />
          <Route path="password" element={<EditPasswordPage />} />
          <Route element={<VerifyLayout />}>
            <Route
              path="password/verify"
              element={<EditPasswordPhoneSection />}
            />
          </Route>

          <Route path="support" element={<SupportPage />} />
          <Route path="faq" element={<FaqPage />} />
          <Route path="notice" element={<NoticePage />} />
        </Route>

        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/fridge" />} />
          <Route path="/fridge" element={<FridgePage />} />
          <Route path="/recipe" element={<RecipePage />} />
          {/* <Route path="/cookeeps" element={<CookeepsPage />} />
          <Route path="/mypage" element={<MyPage />} /> */}
        </Route>
      </Routes>
    </AppLayout>
  );
}
