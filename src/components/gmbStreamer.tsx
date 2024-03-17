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
  Flex,
  CardHeader,
} from "@chakra-ui/react";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import title from "/img/title.png";
import { useParams } from "react-router-dom";
import streamerBG from "/img/streamerBG.jpeg";
import { useGetEnsDetailsByName } from "../hooks/useGetEnsDetails";

export const GmbStreamer = () => {
  const { ensname } = useParams();
  const { address: ensAddress, records: ensDetails } = useGetEnsDetailsByName(
    ensname ?? "",
  );

  return (
    <Center
      bg={"#ffecad"}
      height={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
      // bgImg={streamerBG}
    >
      <VStack>
        <img
          src={title}
          className="title"
          alt="title"
          style={{ width: "50%", marginTop: "-10" }}
        />
        <Card maxW="md">
          <Container bgImg={streamerBG} height={"20vh"} width="md" p={0}>
            <Box float={"right"} p={2} height={"10vh"}>
              <DynamicWidget />
            </Box>
          </Container>
          <Center>
            <Avatar
              bg={"green"}
              size={"xl"}
              mt={-12}
              name={ensname}
              src={ensDetails?.ensAvatar}
            />
          </Center>
          <Center>
            <Text fontSize="2xl">{ensname}</Text>
          </Center>
          <Flex maxW="md" p={2}>
            <Stack direction="row">
              <Badge colorScheme="green">{ensDetails?.ensDescription}</Badge>
              <Badge colorScheme="red">Github: {ensDetails?.ensGithub}</Badge>
              <Badge colorScheme="purple">
                Twitch: {ensDetails?.ensTwitch}
              </Badge>
              <Badge>Discord: {ensDetails?.ensDiscord}</Badge>
            </Stack>
          </Flex>

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
