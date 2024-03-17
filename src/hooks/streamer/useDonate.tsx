import { useCallback, useMemo, useState } from "react";
import { useSmartAccountClient } from "../aa/useSmartAccountClient";
import { useWaitForTransaction } from "wagmi";
import { Hex, parseEther } from "viem";
import { encodeApproveFunction, encodeDonateFunction } from "../../utils";

export const useDonate = () => {
  const saClient = useSmartAccountClient();
  const [isCallLoading, setIsCallLoading] = useState<boolean>(false);
  const [txHash, setTxHash] = useState<`0x${string}`>();
  const {
    isLoading: isTxLoading,
    error,
    isSuccess,
  } = useWaitForTransaction({
    hash: txHash,
  });

  const donate = useCallback(
    async (
      erc20TokenAddress: Hex,
      bananaControllerAddress: string,
      donationAmount: bigint,
      streamerAddress: string,
      donorName: string,
      message: string,
    ) => {
      if (saClient) {
        setIsCallLoading(true);
        const txHash = await saClient.sendTransactions({
          transactions: [
            {
              to: erc20TokenAddress,
              value: parseEther("0"),
              data: encodeApproveFunction(
                bananaControllerAddress,
                donationAmount,
              ),
            },
            {
              to: bananaControllerAddress as `0x${string}`,
              value: parseEther("0"),
              data: encodeDonateFunction(
                streamerAddress,
                erc20TokenAddress,
                donationAmount,
                donorName,
                message,
              ),
            },
          ],
          account: saClient.account!,
        });
        setTxHash(txHash);
        setIsCallLoading(false);
      }
    },
    [saClient],
  );

  const isLoading = useMemo(
    () => isCallLoading || isTxLoading,
    [isCallLoading, isTxLoading],
  );

  return { donate, isSuccess, error, isLoading };
};
