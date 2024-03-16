import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import {
  Avatar,
  Box,
  Container,
  Text,
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

// Create the client
const client = createEnsPublicClient({
  chain: mainnet,
  transport: http(),
});

export const Dashboard = () => {
  return (
    <Container width={"100vw"} p={0}>
      <Container bg={"orange"} height={"20vh"} width={"100vw"} p={0}>
        <Box float={"right"} height={"10vh"} p={4}>
          <Center>
            <Button variant="solid">Share Link</Button>
          </Center>
        </Box>
        <Box float={"right"} p={4} pr={-4} height={"10vh"}>
          <DynamicWidget />
        </Box>
      </Container>
      <Avatar
        bg={"green"}
        size={"xl"}
        mt={-12}
        name="ens.eth name"
        src="/public/img/noun.png"
      />
      <Text fontSize="2xl" mt={-4}>
        Streamer name (ENS)
      </Text>
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
    </Container>
  );
};
