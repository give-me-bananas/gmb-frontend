import { ChakraProvider } from "@chakra-ui/react";
import { Home } from "./pages/Home";
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
import { ZeroDevSmartWalletConnectors } from "@dynamic-labs/ethereum-aa";
import { useGlobalState } from "./reducer";
import { AlertBrowserSource } from "./pages/alert/AlertBrowserSource";
import { Dashboard } from "./pages/Dashboard";
import { GmbStreamer } from "./pages/GmbStreamer";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import theme from "./theme";
import { InputStreamer } from "./pages/InputStreamer";
import { WagmiProvider, createConfig, http } from "wagmi";
import { baseSepolia, sepolia } from "viem/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const config = createConfig({
  chains: [sepolia, baseSepolia],
  multiInjectedProviderDiscovery: false,
  transports: {
    [sepolia.id]: http(),
    [baseSepolia.id]: http(),
  },
});

export const RoutesWithChakraUi = () => {
  return (
    <ChakraProvider theme={theme}>
      <Outlet />
    </ChakraProvider>
  );
};

const queryClient = new QueryClient();

function App() {
  const { dispatch } = useGlobalState();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <DynamicContextProvider
      settings={{
        environmentId: "5ccea484-ee0c-4f68-88f8-4d0eaf6a6b87",
        walletConnectors: [
          EthereumWalletConnectors,
          ZeroDevSmartWalletConnectors,
        ],
        eventsCallbacks: {
          onAuthSuccess: () => {
            dispatch({ type: "setAuth" });
            if (location.pathname === "/") {
              navigate("/dashboard");
            }
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
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <DynamicWagmiConnector>
            <Routes>
              <Route path="/alert/:userId" element={<AlertBrowserSource />} />
              <Route path="/" element={<RoutesWithChakraUi />}>
                <Route index element={<Home />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="gmb" element={<InputStreamer />} />
                <Route path="gmb/:ensname" element={<GmbStreamer />} />
              </Route>
            </Routes>
          </DynamicWagmiConnector>
        </QueryClientProvider>
      </WagmiProvider>
    </DynamicContextProvider>
  );
}

export default App;
