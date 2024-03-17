import { DynamicWidget, useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { Box, Container, Flex } from "@chakra-ui/react";
import logo from "/img/logo.svg";
import title from "/img/title.png";
import { useGlobalState } from "../reducer";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const { state, dispatch } = useGlobalState();
  const navigate = useNavigate();
  const { isConnected } = useAccount();
  const { handleLogOut } = useDynamicContext();
  useEffect(() => {
    if (state.isAuth && !isConnected) {
      dispatch({ type: "setUnauth" });
    }
    if ((state.isAuth && !isConnected) || (!state.isAuth && !isConnected)) {
      handleLogOut();
    }
  }, [state, isConnected, navigate, dispatch]);

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
