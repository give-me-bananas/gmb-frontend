import {
  Card,
  CardBody,
  VStack,
  Text,
  Container,
  Avatar,
  Center,
  Button,
  Box,
  Stack,
  Badge,
  Image,
  CardHeader,
} from "@chakra-ui/react";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import title from "/img/title.png";

export const Tiphome = () => {
  return (
    <Center>
      <VStack>
        <img
          src={title}
          className="title"
          alt="title"
          style={{ width: "50%", marginTop: "-10" }}
        />
        <Card maxW="md">
          {/* <CardHeader>
          <Image objectFit='cover' src="/img/title.png" alt="title" />
            </CardHeader>   */}
          <Container bg={"yellow"} height={"20vh"} width="md" p={0}>
            <Box bg={"orange"} float={"right"} p={2} height={"10vh"}>
              <DynamicWidget />
            </Box>
          </Container>
          <Center>
            <Avatar
              bg={"green"}
              size={"xl"}
              mt={-12}
              name="ens.eth name"
              src="/public/img/noun.png"
            />
          </Center>
          <Text fontSize="2xl">Streamer name (ENS)</Text>
          <Center p={2}>
            <Stack direction="row">
              <Badge>Default</Badge>
              <Badge colorScheme="green">Success</Badge>
              <Badge colorScheme="red">Removed</Badge>
              <Badge colorScheme="purple">New</Badge>
            </Stack>
          </Center>

          <CardBody>
            <VStack>
              {/* <Text m={4}>Give Me Bananas</Text> */}
              <Button size="lg" m={4} variant="solid" colorScheme="yellow">
                Give Me Bananas 🍌
              </Button>
            </VStack>
          </CardBody>
          {/* <CardFooter>Tiphome</CardFooter> */}
        </Card>
      </VStack>
    </Center>
  );
};
