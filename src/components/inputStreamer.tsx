import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Center,
  Card,
  CardHeader,
  VStack,
  CardBody,
  Button,
  CardFooter,
} from "@chakra-ui/react";
import title from "/img/title.png";
import welcome from "/img/welcome.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "/img/logo.svg";

export const InputStreamer = () => {
  const [ensName, setEnsName] = useState<string>(""); // Update the type of ensName to string
  const navigate = useNavigate();

  const handleChange = (event: { target: { value: string } }) =>
    setEnsName(event.target.value); // Update the type of value to string

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    navigate(`/gmb/${ensName}`);
  };

  // const isError = ensName === ''

  return (
    <Center
      bg={"#ffecad"}
      height={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
      paddingTop={"-20vh"}
    >
      <VStack>
        <img
          src={logo}
          className="title"
          alt="title"
          style={{ width: "30%", marginTop: "-40" }}
        />
        <Card maxW="md">
          <CardHeader>
            <Center>
              <img
                src={welcome}
                className="title"
                alt="title"
                style={{ width: "100%", marginBottom: "-20" }}
              />
            </Center>
          </CardHeader>
          <CardBody>
            <FormControl onSubmit={handleSubmit}>
              <FormLabel>
                Please enter the ENS name of the streamer you would like to give
                bananas to:
              </FormLabel>
              <Input
                type="Address"
                placeholder="vitalik.eth"
                onChange={handleChange}
              />
              {/* <FormErrorMessage>ENS not found</FormErrorMessage> */}
            </FormControl>
          </CardBody>
          <CardFooter justifyContent={"center"} alignItems={"center"}>
            <Button
              mt={-4}
              width="200px"
              colorScheme="orange"
              variant="ghost"
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </CardFooter>
        </Card>
      </VStack>
    </Center>
  );
};
