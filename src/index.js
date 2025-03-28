import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";

// Material Dashboard 2 React Context Provider
import { MaterialUIControllerProvider } from "context";

// i18n
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

const container = document.getElementById("app");
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <I18nextProvider i18n={i18n}>
      <MaterialUIControllerProvider>
        <App />
      </MaterialUIControllerProvider>
    </I18nextProvider>
  </BrowserRouter>
);
