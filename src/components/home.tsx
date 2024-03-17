import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import { Box, Container, Flex } from "@chakra-ui/react";
import logo from "/img/logo.svg";
import title from "/img/title.png";

export const Home = () => {
  return (
    <Box bg={"#ffecad"}>
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
          width={"100%"}
        >
          <img src={logo} className="logo" alt="logo" />
          <img src={title} className="title" alt="title" />
          <DynamicWidget />
        </Flex>
      </Container>
    </Box>
  );
};
