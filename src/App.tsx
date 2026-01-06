import { Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";

// import InitialPage from "./pages/auth/InitialPage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import FindPage from "./pages/auth/FindPage";
import ResetPassword from "./components/auth/find/ResetPassword";

export default function App() {
  return (
    // <AppLayout>
    //   <Routes>
    //     <Route path="/" element={<InitialPage />} />
    //   </Routes>
    // </AppLayout>
    <AppLayout>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/find" element={<FindPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </AppLayout>
  );
}
