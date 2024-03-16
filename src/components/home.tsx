import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import { Center } from "@chakra-ui/react";
import { VStack } from "@chakra-ui/react";
import logo from "/img/logo.svg";
import title from "/img/title.png";

export const Home = () => {
  return (
    <Center w="100%" height="90vh">
      <VStack>
        <img src={logo} className="logo" alt="logo" style={{ width: "50%" }} />
        <img
          src={title}
          className="title"
          alt="title"
          style={{ width: "50%" }}
        />
        <DynamicWidget />
      </VStack>
    </Center>
  );
};
