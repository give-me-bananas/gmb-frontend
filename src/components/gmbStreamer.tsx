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
  CardFooter,
} from "@chakra-ui/react";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import title from "/img/title.png";
import { useParams } from "react-router-dom";
import streamerBG from "/img/streamerBG.jpeg";
import { useGetEnsDetailsByName } from "../hooks/useGetEnsDetails";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  FormHelperText,
} from "@chakra-ui/react";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
} from "@chakra-ui/react";

export const GmbStreamer = () => {
  const { ensname } = useParams();
  const { address: ensAddress, records: ensDetails } = useGetEnsDetailsByName(
    ensname ?? "",
  );

  return (
    <Center
      bg={"#ffecad"}
      height={"120vh"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <VStack>
        {/* <img
          src={title}
          className="title"
          alt="title"
          style={{ width: "50%", marginTop: "-10" }}
        /> */}
        <Card maxW="md">
          <Container bgImg={streamerBG} height={"15vh"} width="md" p={0}>
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
          <Flex
            gap={2}
            maxW="md"
            p={4}
            flexWrap={"wrap"}
            flex={1}
            width="100%"
            display={"flex"}
          >
            <Badge colorScheme="green">{ensDetails?.ensDescription}</Badge>
            <Badge colorScheme="red">Github: {ensDetails?.ensGithub}</Badge>
            <Badge colorScheme="purple">Twitch: {ensDetails?.ensTwitch}</Badge>
            <Badge>Discord: {ensDetails?.ensDiscord}</Badge>
          </Flex>
          <CardBody>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input type="string" />
              <FormLabel>Token</FormLabel>
              <Select placeholder="Select Token">
                <option value="USDC">USDC 💲</option>
                <option value="APE">APE 🐵</option>
              </Select>
              <FormLabel>Value</FormLabel>

              <NumberInput
                defaultValue={0.05}
                min={0.001}
                max={1.0}
                step={0.005}
                precision={4}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <FormLabel>Message</FormLabel>
              <Input type="string" />
            </FormControl>
          </CardBody>

          <CardFooter justifyContent={"center"} alignItems={"center"}>
            <Button size="lg" m={2} variant="solid" colorScheme="yellow">
              Give Me Bananas 🍌
            </Button>
          </CardFooter>
          {/* <CardFooter>Tiphome</CardFooter> */}
        </Card>
      </VStack>
    </Center>
  );
};
