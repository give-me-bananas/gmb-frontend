import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { GlobalStateProvider } from "./reducer/store.tsx";
import { BrowserRouter } from "react-router-dom";
import theme from "./theme.ts";
import { ColorModeScript } from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <GlobalStateProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GlobalStateProvider>
  </React.StrictMode>,
);
