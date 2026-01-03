import { Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";

import InitialPage from "./pages/auth/InitialPage";
import LoginPage from "./pages/auth/LoginPage";

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
      </Routes>
    </AppLayout>
  );
}
