import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import { Box } from "@chakra-ui/react";
import { VStack } from "@chakra-ui/react";
import logo from "/img/logo.svg";
import "./home.css";

export const Home = () => {
  return (
    <Box
      w="100%"
      p={4}
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="90vh"
    >
      <VStack>
        <img src={logo} className="logo" alt="logo" />
        <h1 className="yellow">Give Me Bananas</h1>
        <DynamicWidget />
      </VStack>
    </Box>
  );
};
