import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import store from "./app/store";
import { Provider } from "react-redux";
import { RouterApp } from "./router/RouterApp.jsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Provider store={store}>
        <BrowserRouter>
          <RouterApp />
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
