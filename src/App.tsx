import { ChakraProvider } from "@chakra-ui/react";

import { Home } from "./components/home";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { useGlobalState } from "./reducer";

function App() {
  const { dispatch, state } = useGlobalState();
  console.log(state);
  return (
    <ChakraProvider>
      <BrowserRouter>
        <DynamicContextProvider
          settings={{
            environmentId: "69228cae-9b14-4a93-8567-656b7c3d7869",
            walletConnectors: [EthereumWalletConnectors],
            eventsCallbacks: {
              onAuthSuccess: () => {
                dispatch({ type: "setAuth" });
              },
            },
          }}
        >
          {/* <DynamicWagmiConnector> */}

          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="about" element={<About />} /> */}
          </Routes>
          {/* </DynamicWagmiConnector> */}
        </DynamicContextProvider>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
