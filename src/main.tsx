import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, HashRouter } from "react-router-dom";
import "./styles/index.css";
import App from "./App.tsx";

import { registerSW } from "virtual:pwa-register";

function isIOSPWA() {
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) &&
    (window.navigator as any).standalone === true
  );
}

const Router = isIOSPWA() ? HashRouter : BrowserRouter;
registerSW({ immediate: true });
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>,
);
