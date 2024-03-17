import { Box } from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { Card, CardHeader, Heading, CardBody } from "@chakra-ui/react";
import { useGetDonationHistory } from "../hooks/apis/useGetDonationHistory";
import { useSmartAccountClient } from "../hooks/aa/useSmartAccountClient";

export const Transactions = () => {
  const saClient = useSmartAccountClient();
  const { data: donationHistory } = useGetDonationHistory(
    saClient?.account?.address,
  );

  return (
    <Box m={4} w="60%" maxH={"20vh"}>
      <Card size={"md"}>
        <CardHeader>
          <Heading size="md">Transaction History</Heading>
        </CardHeader>
        <CardBody>
          <TableContainer>
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th>Streamer</Th>
                  <Th>Donor</Th>
                  <Th>Donor Name</Th>
                  <Th>Message</Th>
                  <Th>Net Donation</Th>
                  <Th>Commission</Th>
                </Tr>
              </Thead>
              <Tbody>
                {donationHistory.map((transaction, index) => (
                  <Tr key={index}>
                    <Td>{transaction.streamer}</Td>
                    <Td>{transaction.donor}</Td>
                    <Td>{transaction.donorName}</Td>
                    <Td>{transaction.message}</Td>
                    <Td>{transaction.netDonation}</Td>
                    <Td>{transaction.commission}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </CardBody>
      </Card>
    </Box>
  );
};
