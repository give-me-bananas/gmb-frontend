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
  Badge,
  Flex,
  CardFooter,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
} from "@chakra-ui/react";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import { useParams } from "react-router-dom";
import streamerBG from "/img/streamerBG.jpeg";
import { useGetEnsDetailsByName } from "../hooks/useGetEnsDetails";
import { useDonate } from "../hooks/streamer/useDonate";
import { useState } from "react";
import { parseEther, parseUnits } from "viem";

export const GmbStreamer = () => {
  const { ensname } = useParams();
  const { address: ensAddress, records: ensDetails } = useGetEnsDetailsByName(
    ensname ?? "",
  );
  const [formData, setFormData] = useState<{
    message?: string;
    name?: string;
    amount?: bigint;
    tokenType?: string;
  }>();
  // const { approve, isLoading, isApproveSuccess } = useErc20Approve();
  // const { approve, isLoading, isSuccess } = useErc20Approve();
  const { donate, isLoading } = useDonate();

  // console.log(formData);

  const onGmbClick = async () => {
    console.log(formData);
    if (formData?.amount && formData?.name && formData?.message) {
      let tokenAddress: `0x${string}` =
        "0x036CbD53842c5426634e7929541eC2318f3dCF7e";
      if (formData.tokenType === "APE") {
        tokenAddress = "0x01e61008f78a83e0dabd2fbd7ef81b64cdd2e1f4";
      } else {
        tokenAddress = "0x036CbD53842c5426634e7929541eC2318f3dCF7e";
      }

      await donate(
        tokenAddress as `0x${string}`,
        formData?.amount,
        ensAddress as `0x${string}`,
        formData?.name,
        formData?.message,
      );
    }
  };

  return (
    <Center
      bg={"#ffecad"}
      height={"120vh"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <VStack>
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
              <Input
                type="string"
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    name: e.target.value,
                  }))
                }
              />
              <FormLabel>Token</FormLabel>
              <Select
                placeholder="Select Token"
                onChange={(event) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    tokenType: event.target.value,
                  }))
                }
              >
                <option value="USDC">USDC 💲</option>
                <option value="APE">APE 🐵</option>
              </Select>
              <FormLabel>Value</FormLabel>

              <NumberInput
                min={0.001}
                max={1.0}
                step={0.005}
                precision={4}
                onChange={(valueString) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    amount:
                      prevData?.tokenType === "USDC"
                        ? BigInt(parseUnits(valueString, 6))
                        : BigInt(parseEther(valueString)),
                  }))
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <FormLabel>Message</FormLabel>
              <Input
                type="string"
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    message: e.target.value,
                  }))
                }
              />
            </FormControl>
          </CardBody>

          <CardFooter justifyContent={"center"} alignItems={"center"}>
            <Button
              size="lg"
              m={2}
              variant="solid"
              colorScheme="yellow"
              onClick={onGmbClick}
              isLoading={isLoading}
            >
              Give Me Bananas 🍌
            </Button>
          </CardFooter>
        </Card>
      </VStack>
    </Center>
  );
};
