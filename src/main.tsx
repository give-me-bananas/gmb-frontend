import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from 'react-router-dom';

import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
// import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
    <DynamicContextProvider
      settings={{
        environmentId: "69228cae-9b14-4a93-8567-656b7c3d7869",
        walletConnectors: [EthereumWalletConnectors],
      }}
    >
      {/* <DynamicWagmiConnector> */}

      <App />
      {/* </DynamicWagmiConnector> */}
    </DynamicContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
