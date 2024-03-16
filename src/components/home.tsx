import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import { Container, Flex } from "@chakra-ui/react";
import logo from "/img/logo.svg";
import title from "/img/title.png";

export const Home = () => {
  return (
    <Container
      w="100vw"
      height="100vh"
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        direction={"column"}
        margin={"auto"}
      >
        <img src={logo} className="logo" alt="logo" />
        <img src={title} className="title" alt="title" />
        <DynamicWidget />
      </Flex>
    </Container>
  );
};
