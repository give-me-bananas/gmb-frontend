import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import { Avatar, Box, Stack, Badge, Center, Flex } from "@chakra-ui/react";
import { Earnings } from "./earnings";
import { Transactions } from "./transactions";
import { useEffect, useState } from "react";
import { Text } from "@chakra-ui/react";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useGetEnsDetailsByAddress } from "../hooks/useGetEnsDetails";
import streamerBG from "/img/streamerBG.jpeg";

export const Dashboard = () => {
  const [ethAddress, setEthAddress] = useState<string>("");
  const { user } = useDynamicContext();

  const { name: ensName, records: ensDetails } =
    useGetEnsDetailsByAddress(ethAddress);

  useEffect(() => {
    if (user?.verifiedCredentials[0]?.address) {
      const add = user?.verifiedCredentials[0]?.address;
      setEthAddress(add);
      console.log(ethAddress);
    }
  }, [user]);

  return (
    <Box bg={"#ffecad"} width={"100vw"} height={"99vh"}>
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
        <Text fontSize="2xl">{ensName ? ensName : ethAddress}</Text>
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
