import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import {
  Avatar,
  Box,
  Stack,
  Badge,
  Center,
  Flex,
  Button,
} from "@chakra-ui/react";
import { Earnings } from "./earnings";
import { Transactions } from "./transactions";

import { http } from "viem";
import { mainnet } from "viem/chains";
import { createEnsPublicClient } from "@ensdomains/ensjs";
import { useEffect, useState } from "react";
import { Text } from "@chakra-ui/react";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

export const Dashboard = () => {
  // Create the client
  const client = createEnsPublicClient({
    chain: mainnet,
    transport: http(),
  });

  const [ethAddress, setEthAddress] = useState<string>("");
  const [ensName, setEnsName] = useState<string>("");
  const { user } = useDynamicContext();

  useEffect(() => {
    if (user?.verifiedCredentials[0]?.address) {
      const add = user?.verifiedCredentials[0]?.address.slice(2);
      setEthAddress(add);
      console.log(ethAddress);
    }
  }, [user]);

  useEffect(() => {
    const getName = async () => {
      const address = await client.getName({
        address: `0x${ethAddress}`,
      });
      setEnsName(address?.name.toString() || ""); // Convert address name to string and provide a default value when address is null
    };
    getName();
  }, []);

  return (
    <Box bg={"green"} width={"100vw"} height={"99vh"}>
      <Box bg={"orange"} height={"20vh"} width={"100vw"}>
        <Box float={"right"} height={"10vh"} m={4}>
          <Center>
            <Button variant="solid">Share Link</Button>
          </Center>
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
          name="ens.eth name"
          src="/public/img/noun.png"
        />
      </Center>
      <Center>
        <Text fontSize="2xl">{ensName ? ensName : ethAddress}</Text>
      </Center>
      <Center p={2}>
        <Stack direction="row">
          <Badge>Default</Badge>
          <Badge colorScheme="green">Success</Badge>
          <Badge colorScheme="red">Removed</Badge>
          <Badge colorScheme="purple">New</Badge>
        </Stack>
      </Center>
      <Flex>
        <Earnings />
        <Transactions />
      </Flex>
    </Box>
  );
};
