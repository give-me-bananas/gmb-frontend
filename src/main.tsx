import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { GlobalStateProvider } from "./reducer/store.tsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStateProvider>
        <App />
      </GlobalStateProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
