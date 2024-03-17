import { useCallback, useMemo } from "react";
import { useChainId, useContractWrite, useWaitForTransaction } from "wagmi";
import { Hex, parseEther } from "viem";
import config from "../../config";
import { BananaAbi } from "../../abis/BananaController.abi";

export const useDonate = () => {
  const chainId = useChainId();
  const {
    data,
    error: callError,
    isLoading: isCallLoading,
    write,
  } = useContractWrite({
    address: config.bananaControllerAddress[
      chainId as keyof (typeof config)["bananaControllerAddress"]
    ] as `0x${string}`,
    abi: BananaAbi,
    functionName: "fakeDonate",
  });

  const {
    isLoading: isTxLoading,
    error: txError,
    isSuccess,
  } = useWaitForTransaction({
    hash: data?.hash,
  });

  const donate = useCallback(
    async (
      erc20TokenAddress: Hex,
      donationAmount: bigint,
      streamerAddress: string,
      donorName: string,
      message: string,
    ) => {
      write({
        args: [
          streamerAddress,
          erc20TokenAddress,
          parseEther(donationAmount.toString()),
          donorName,
          message,
        ],
      });
    },
    [write],
  );

  const isLoading = useMemo(
    () => isCallLoading || isTxLoading,
    [isCallLoading, isTxLoading],
  );

  const error = useMemo(() => callError || txError, [callError, txError]);

  return { donate, isSuccess, error, isLoading };
};
