import { Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";

import InitialPage from "./pages/auth/InitialPage";
import OnboardingPage from "./pages/login/OnboardingPage";

export default function App() {
  return (
    <AppLayout>
      <Routes>
        {/* <Route path="/" element={<InitialPage />} /> */}
        <Route path="/" element={<OnboardingPage />} />
      </Routes>
    </AppLayout>
  );
}
