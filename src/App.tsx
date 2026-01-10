import { Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";

import InitialPage from "./pages/auth/InitialPage";
import OnboardingPage from "./pages/login/OnboardingPage";
import LoginPage from "./pages/auth/LoginPage";
import TabBar from "./components/tabBar/TabBar";

export default function App() {
  return (
    // <AppLayout>
    //   <Routes>
    //     <Route path="/" element={<InitialPage />} />
    //   </Routes>
    // </AppLayout>
    <AppLayout>
      <Routes>
        {/* <Route path="/" element={<InitialPage />} /> */}
        {/* <Route path="/" element={<OnboardingPage />} /> */}
        {/* <Route path="/" element={<LoginPage />} /> */}
        <Route path="/" element={<TabBar />} />
      </Routes>
    </AppLayout>
  );
}
