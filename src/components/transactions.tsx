import { Box } from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { Card, CardHeader, Heading, CardBody } from "@chakra-ui/react";

type Response = {
  streamer: string;
  donor: string;
  donorName: string;
  erc20TokenAddress: string;
  message: string;
  netDonation: string;
  commission: string;
};

const res: Response[] = [
  {
    streamer: "0x5fbdb2315678afecb367f032d93f642f64180aa3",
    donor: "0x7730edfb83212babe9396064d765a3d5afec671a",
    donorName: "WK",
    erc20TokenAddress: "0x5fbdb2315678afecb367f032d93f642f64180aa3",
    message: "Lmao",
    netDonation: "$1234",
    commission: "$1234",
  },
  {
    streamer: "0x5fbdb2315678afecb367f032d93f642f64180aa3",
    donor: "0x7730edfb83212babe9396064d765a3d5afec671a",
    donorName: "WK",
    erc20TokenAddress: "0x5fbdb2315678afecb367f032d93f642f64180aa3",
    message: "Lmao",
    netDonation: "$1234",
    commission: "$1234",
  },
  {
    streamer: "0x5fbdb2315678afecb367f032d93f642f64180aa3",
    donor: "0x7730edfb83212babe9396064d765a3d5afec671a",
    donorName: "WK",
    erc20TokenAddress: "0x5fbdb2315678afecb367f032d93f642f64180aa3",
    message: "Lmao",
    netDonation: "$1234",
    commission: "$1234",
  },
  {
    streamer: "0x5fbdb2315678afecb367f032d93f642f64180aa3",
    donor: "0x7730edfb83212babe9396064d765a3d5afec671a",
    donorName: "WK",
    erc20TokenAddress: "0x5fbdb2315678afecb367f032d93f642f64180aa3",
    message: "Lmao",
    netDonation: "$1234",
    commission: "$1234",
  },
  {
    streamer: "0x5fbdb2315678afecb367f032d93f642f64180aa3",
    donor: "0x7730edfb83212babe9396064d765a3d5afec671a",
    donorName: "WK",
    erc20TokenAddress: "0x5fbdb2315678afecb367f032d93f642f64180aa3",
    message: "Lmao",
    netDonation: "$1234",
    commission: "$1234",
  },
];

export const Transactions = () => {
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
                  <Th>Token Address</Th>
                  <Th>Message</Th>
                  <Th>Net Donation</Th>
                  <Th>Commission</Th>
                </Tr>
              </Thead>
              <Tbody>
                {res.map((transaction, index) => (
                  <Tr key={index}>
                    <Td>{transaction.streamer}</Td>
                    <Td>{transaction.donor}</Td>
                    <Td>{transaction.donorName}</Td>
                    <Td>{transaction.erc20TokenAddress}</Td>
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
