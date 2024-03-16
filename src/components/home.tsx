import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import { Center } from "@chakra-ui/react";
import { VStack } from "@chakra-ui/react";
import logo from "/img/logo.svg";
import "./home.css";

export const Home = () => {
  return (
    <Center w="100%" p={0} height="90vh">
      <VStack>
        <img src={logo} className="logo" alt="logo" />
        <h1 className="yellow">Give Me Bananas</h1>
        <DynamicWidget />
      </VStack>
    </Center>
  );
};
