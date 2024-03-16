import { ChakraProvider } from "@chakra-ui/react";
import { Home } from "./components/home";
import "./App.css";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { useGlobalState } from "./reducer";
import { AlertBrowserSource } from "./pages/alert/AlertBrowserSource";
import { Dashboard } from "./components/dashboard";
import { Tiphome } from "./components/tiphome";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import theme from "./theme";

export const RoutesWithChakraUi = () => {
  return (
    <ChakraProvider theme={theme}>
      <Outlet />
    </ChakraProvider>
  );
};

function App() {
  const { dispatch } = useGlobalState();
  const navigate = useNavigate();

  return (
    <DynamicContextProvider
      theme={"dark"}
      settings={{
        environmentId: "69228cae-9b14-4a93-8567-656b7c3d7869",
        walletConnectors: [EthereumWalletConnectors],
        eventsCallbacks: {
          onAuthSuccess: (args) => {
            dispatch({ type: "setAuth" });
            navigate("/dashboard", { state: { userInfo: args } });
          },
          onLogout: () => {
            dispatch({ type: "setUnauth" });
            navigate("/");
          },
        },
      }}
    >
      <DynamicWagmiConnector>
        <Routes>
          <Route path="/alert/:userId" element={<AlertBrowserSource />} />
          <Route path="/" element={<RoutesWithChakraUi />}>
            <Route index element={<Home />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="tiphome" element={<Tiphome />} />
          </Route>
        </Routes>
      </DynamicWagmiConnector>
    </DynamicContextProvider>
  );
}

export default App;
