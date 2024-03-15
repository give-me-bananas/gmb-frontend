import { ChakraProvider } from "@chakra-ui/react";
import { Home } from "./components/home";
import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { useGlobalState } from "./reducer";
import {
  AlertBrowserSource,
  loader as alertBrowserSourceLoader,
} from "./pages/alert/AlertBrowserSource";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/alert/:userId",
    element: <AlertBrowserSource />,
    loader: alertBrowserSourceLoader,
  },
]);

function App() {
  const { dispatch, state } = useGlobalState();
  console.log(state);
  return (
    <ChakraProvider>
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
        <RouterProvider router={router} />
        {/* </DynamicWagmiConnector> */}
      </DynamicContextProvider>
    </ChakraProvider>
  );
}

export default App;
