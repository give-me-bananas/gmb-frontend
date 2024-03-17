import { useCallback, useMemo, useState } from "react";
import { useChainId, useContractWrite, useWaitForTransaction } from "wagmi";
import { Hex, parseEther } from "viem";
import { encodeApproveFunction, encodeDonateFunction } from "../../utils";
import config from "../../config";
import { BananaAbi } from "../../abis/BananaController.abi";

export const useDonate = () => {
  const chainId = useChainId();
  const { data, error, isSuccess, isLoading, write } = useContractWrite({
    address: config.bananaControllerAddress[
      chainId as keyof (typeof config)["bananaControllerAddress"]
    ] as `0x${string}`,
    abi: BananaAbi,
    functionName: "donate",
  });
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
