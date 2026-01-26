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

import SettingsPage from "./pages/settings/SettingsPage";
import EditPhonePage from "./pages/settings/EditPhonePage";
import SettingsLayout from "./layouts/SettingsLayout";
import EditEmailPage from "./pages/settings/EditEmailPage";
import EditPasswordPage from "./pages/settings/EditPasswordPage";
import VerifyLayout from "./layouts/VerifyLayout";
import EditPasswordPhoneSection from "./components/settings/sections/EditPasswordPhoneSection";

import SimpleLoginAgreementPage from "./pages/auth/SimpleLoginAgreementPage";
import SupportPage from "./pages/settings/SupportPage";
import FaqPage from "./pages/settings/FaqPage";
import NoticePage from "./pages/settings/NoticePage";
import TermsPage from "./pages/settings/TermsPage";
import WithdrawPage from "./pages/settings/WithdrawPage";
import WithdrawDonePage from "./pages/settings/WithdrawDonePage";

import Layout from "./layouts/Layout";
import FridgePage from "./pages/fridge/FridgePage";
import AddItemPage from "./pages/fridge/AddItemPage";
import AddItemLayout from "./layouts/AddItemLayout";
import Details from "./components/fridge/addItems/Details";

import RecipePage from "./pages/recipe/RecipePage";
import RecipeIntroPage from "./pages/recipe/RecipeIntroPage";
import RecipeSelectPage from "./pages/recipe/RecipeSelectPage";
import RecipeConfirmPage from "./pages/recipe/RecipeConfirmPage";
import RecipeLoadingPage from "./pages/recipe/RecipeLoadingPage";
import RecipeResultPage from "./pages/recipe/RecipeResultPage";
import CookeepsPage from "./pages/cookeeps/CookeepsPage";
import MyPlantPage from "./pages/cookeeps/MyPlantPage";
import RecipeDetailPage from "./pages/cookeeps/RecipeDetailPage";

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

          <Route path="faq" element={<FaqPage />} />
          <Route path="notice" element={<NoticePage />} />
          <Route path="terms" element={<TermsPage />} />
          <Route path="withdraw" element={<WithdrawPage />} />
        </Route>

        {/*헤더 없기에 따로 뺌*/}
        <Route path="/settings/withdraw/done" element={<WithdrawDonePage />} />
        <Route path="/support" element={<SupportPage />} />

        <Route element={<Layout />}>
          <Route path="/fridge" element={<FridgePage />} />
          <Route path="/recipe" element={<RecipePage />}>
            <Route index element={<RecipeIntroPage />} />
            <Route path="select" element={<RecipeSelectPage />} />
            <Route path="confirm" element={<RecipeConfirmPage />} />
            <Route path="loading" element={<RecipeLoadingPage />} />
            <Route path="result" element={<RecipeResultPage />} />
            <Route path=":id" element={<RecipeDetailPage />} />
          </Route>

          <Route path="/cookeeps" element={<CookeepsPage />} />
          <Route path="/cookeeps/my-plant" element={<MyPlantPage />} />

          {/* <Route path="/mypage" element={<MyPage />} /> */}
        </Route>

        <Route element={<AddItemLayout />}>
          <Route path="/fridge/add" element={<AddItemPage />} />
          <Route path="/fridge/add-detail" element={<Details />} />
        </Route>
      </Routes>
    </AppLayout>
  );
}
