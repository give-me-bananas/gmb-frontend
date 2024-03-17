import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogOverlay,
  Spinner,
} from "@chakra-ui/react";
import { useRef } from "react";
import styled from "@emotion/styled";

const FirstTimeDialogText = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  text-align: center;
  text-align: center;
  justify-content: center;
  align-items: center;
`;

export const FirstTimeDialog = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const cancelRef = useRef(null);

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Welcome to GMB 🍌
          </AlertDialogHeader>

          <AlertDialogBody
            justifyContent={"center"}
            alignItems={"center"}
            display={"flex"}
            flexDir={"column"}
            p={4}
          >
            <FirstTimeDialogText>
              Looks like you are new here. We'll be setting up your account and
              binding you on chain! You'll need to sign a transaction to do
              this.
              <Spinner m={4} size={"lg"} />
              Don't worry, The fees are waived by our paymaster so you won't
              have to pay any gas fees!
            </FirstTimeDialogText>
          </AlertDialogBody>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
