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
import { useAccount } from "wagmi";

export const Transactions = () => {
  const { address } = useAccount();
  const { data: donationHistory } = useGetDonationHistory(address);

  return (
    <Box m={4} w="100%" maxH={"20vh"}>
      <Card size={"md"}>
        <CardHeader>
          <Heading size="md">Incoming Bananas!</Heading>
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
