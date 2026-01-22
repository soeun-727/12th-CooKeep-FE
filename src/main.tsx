import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, HashRouter } from "react-router-dom";
import "./styles/index.css";
import App from "./App.tsx";

const Router = isIOSPWA() ? HashRouter : BrowserRouter;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>,
);

function isIOSPWA() {
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) &&
    (window.navigator as any).standalone === true
  );
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js");
  });
}
