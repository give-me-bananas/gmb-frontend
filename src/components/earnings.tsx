import { Box, Text, Button } from "@chakra-ui/react";
import {
  Card,
  CardHeader,
  Heading,
  CardBody,
  CardFooter,
  Stack,
  StackDivider,
} from "@chakra-ui/react";
import { NumberInput, NumberInputField } from "@chakra-ui/react";

export const Earnings = () => {
  return (
    <Box m={4} mr={0} p={0} w="40%">
      <Card>
        <CardHeader>
          <Heading size="md">Earnings Report</Heading>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Summary
              </Heading>
              <Text pt="2" fontSize="sm">
                Total Earnings:
              </Text>
              <Text pt="0" fontSize="sm">
                Total Withdrawed:
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Overview
              </Heading>

              <Text pt="2" fontSize="sm">
                Avg Daily Earnings:
              </Text>
              <Text pt="0" fontSize="sm">
                Avg Weekly Earnings:
              </Text>
              <Text pt="0" fontSize="sm">
                Avg Monthly Earnings:
              </Text>
            </Box>
          </Stack>
        </CardBody>
        <CardFooter>
          <NumberInput
            width="60%"
            mb={-4}
            defaultValue={15}
            min={10}
            max={20}
            alignContent={"stretch"}
          >
            <NumberInputField />
          </NumberInput>

          <Button width="40%" variant="solid" colorScheme="blue" ml={2}>
            Withdraw
          </Button>
        </CardFooter>
      </Card>
    </Box>
  );
};
