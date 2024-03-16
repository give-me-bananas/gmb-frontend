import { ChakraProvider } from "@chakra-ui/react";
import { Home } from "./components/home";
import "./App.css";
import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { useGlobalState } from "./reducer";
import {
  AlertBrowserSource,
  loader as alertBrowserSourceLoader,
} from "./pages/alert/AlertBrowserSource";

export const RoutesWithChakraUi = () => {
  return (
    <ChakraProvider>
      <Outlet />
    </ChakraProvider>
  );
};

function App() {
  const { dispatch, state } = useGlobalState();
  console.log(state);
  return (
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
      <BrowserRouter>
        <Routes>
          <Route
            path="/alert/:userId"
            element={<AlertBrowserSource />}
            loader={alertBrowserSourceLoader}
          />
          <Route path="/" element={<RoutesWithChakraUi />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
      {/* </DynamicWagmiConnector> */}
    </DynamicContextProvider>
  );
}

export default App;
