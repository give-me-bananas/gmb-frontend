import { ChakraProvider } from "@chakra-ui/react";
import { Home } from "./components/home";
import { Dashboard } from "./components/dashboard";
import { useNavigate, Routes, Route, BrowserRouter } from "react-router-dom";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { useGlobalState } from "./reducer";
import { Tiphome } from "./components/tiphome";
import theme from "./theme";

function App() {
  const { dispatch, state } = useGlobalState();
  // console.log(state);

  const navigate = useNavigate();

  // if(state.isAuth) {
  //   navigate("/dashboard");
  // }

  return (
    <ChakraProvider theme={theme}>
      {/* <BrowserRouter> */}
      <DynamicContextProvider
        settings={{
          environmentId: "69228cae-9b14-4a93-8567-656b7c3d7869",
          walletConnectors: [EthereumWalletConnectors],
          eventsCallbacks: {
            onAuthSuccess: () => {
              dispatch({ type: "setAuth" });
              navigate("/dashboard");
            },
            onLogout: () => {
              dispatch({ type: "setUnauth" });
              navigate("/");
            },
          },
        }}
      >
        {/* <DynamicWagmiConnector> */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="tiphome" element={<Tiphome />} />
        </Routes>
        {/* </DynamicWagmiConnector> */}
      </DynamicContextProvider>
      {/* </BrowserRouter> */}
    </ChakraProvider>
  );
}

export default App;
