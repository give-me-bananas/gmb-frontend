import { DynamicWidget, useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { Box, Container, Flex } from "@chakra-ui/react";
import logo from "/img/logo.svg";
import title from "/img/title.png";
import { useEffect } from "react";
import { useAccount } from "wagmi";

export const Home = () => {
  const { isConnected } = useAccount();
  const { handleLogOut } = useDynamicContext();
  useEffect(() => {
    if (!isConnected) {
      handleLogOut();
    }
  }, [isConnected, handleLogOut]);

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
