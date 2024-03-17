import { ChakraProvider } from "@chakra-ui/react";
import { Home } from "./components/home";
import "./App.css";
import {
  Outlet,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { useGlobalState } from "./reducer";
import { AlertBrowserSource } from "./pages/alert/AlertBrowserSource";
import { Dashboard } from "./components/dashboard";
import { GmbStreamer } from "./components/gmbStreamer";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import theme from "./theme";
import { InputStreamer } from "./components/inputStreamer";

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
  const location = useLocation();
  console.log(location.pathname);

  return (
    <DynamicContextProvider
      // theme={"light"}
      settings={{
        environmentId: "69228cae-9b14-4a93-8567-656b7c3d7869",
        walletConnectors: [EthereumWalletConnectors],
        eventsCallbacks: {
          onAuthSuccess: () => {
            dispatch({ type: "setAuth" });
            if (location.pathname === "/") {
              navigate("/dashboard");
            }
            // navigate("/dashboard");
          },
          onLogout: () => {
            dispatch({ type: "setUnauth" });
            if (location.pathname === "/dashboard") {
              navigate("/");
            }
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
            <Route path="gmb/:ensname" element={<GmbStreamer />} />
            <Route path="gmb" element={<InputStreamer />} />
          </Route>
        </Routes>
      </DynamicWagmiConnector>
    </DynamicContextProvider>
  );
}

export default App;
