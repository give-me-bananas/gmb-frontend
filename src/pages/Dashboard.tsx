import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import { Avatar, Box, Stack, Badge, Center, Flex } from "@chakra-ui/react";
import { Earnings } from "../components/earnings";
import { Transactions } from "../components/transactions";
import { useEffect, useState } from "react";
import { Text } from "@chakra-ui/react";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useGetEnsDetailsByAddress } from "../hooks/useGetEnsDetails";
import streamerBG from "/img/streamerBG.jpeg";
import { useAccount } from "wagmi";
import { FirstTimeDialog } from "../components/FirstTimeDialog";
import { useGetIsStreamer } from "../hooks/streamer/useGetIsStreamer";
import { useRegisterAccount } from "../hooks/streamer/useRegisterAccount";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../reducer";

export const Dashboard = () => {
  const { user } = useDynamicContext();
  const { state } = useGlobalState();
  const { address, isConnected } = useAccount();
  const navigate = useNavigate();
  const { data: isBoundOnChain } = useGetIsStreamer(address);

  const { name: ensName, records: ensDetails } = useGetEnsDetailsByAddress(
    address ?? "",
  );
  const { registerAccount } = useRegisterAccount();
  const [showFirstTimeDialog, setShowFirstTimeDialog] =
    useState<boolean>(false);

  useEffect(() => {
    console.log(state);
    console.log(isConnected);
    if (!state.isAuth && !isConnected) {
      navigate("/", { replace: true });
    }
  }, [isConnected, navigate, state]);

  useEffect(() => {
    const asyncFn = async () => {
      if (address && ((user?.newUser && !isBoundOnChain) || !isBoundOnChain)) {
        setShowFirstTimeDialog(true);
        await registerAccount();
        setShowFirstTimeDialog(false);
      }
    };
    asyncFn();
  }, [address, user, isBoundOnChain, registerAccount]);

  return (
    <Box bg={"#ffecad"} width={"100vw"} height={"99vh"}>
      <FirstTimeDialog onClose={() => {}} isOpen={showFirstTimeDialog} />
      <Box
        bgImg={streamerBG}
        height={"20vh"}
        width={"100vw"}
        borderRadius={"20px"}
      >
        <Box float={"right"} height={"10vh"} m={4}>
          {/* <Center>
            <Button variant="solid">Share Link</Button>
          </Center> */}
        </Box>
        <Box float={"right"} m={4} mr={-2} pr={-4} height={"10vh"}>
          <DynamicWidget />
        </Box>
      </Box>
      <Center>
        <Avatar
          bg={"green"}
          size={"xl"}
          mt={-12}
          name={ensName ? ensName : "GMB"}
          src={ensDetails?.ensAvatar}
        />
      </Center>
      <Center>
        <Text fontSize="2xl">{ensName ? ensName : address}</Text>
      </Center>
      <Center p={2}>
        <Stack direction="row">
          <Badge colorScheme="green">{ensDetails?.ensDescription}</Badge>
          <Badge colorScheme="red">Github: {ensDetails?.ensGithub}</Badge>
          <Badge colorScheme="purple">Twitch: {ensDetails?.ensTwitch}</Badge>
          <Badge>Discord: {ensDetails?.ensDiscord}</Badge>
        </Stack>
      </Center>
      <Flex>
        <Earnings />
        <Transactions />
      </Flex>
    </Box>
  );
};
