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
} from "@chakra-ui/react";
import title from "/img/title.png";
import welcome from "/img/welcome.png";
import { Address } from "viem";

export const InputStreamer = () => {
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
          src={title}
          className="title"
          alt="title"
          style={{ width: "50%", marginTop: "-20" }}
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
            <FormControl>
              <FormLabel>
                Please enter the ENS name of the streamer you would like to give
                bananas to:
              </FormLabel>
              <Input type="Address" placeholder="vitalik.eth" />
              {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
            </FormControl>
          </CardBody>
        </Card>
      </VStack>
    </Center>
  );
};
