import { useCallback, useMemo } from "react";
import {
  useChainId,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { Hex, parseEther } from "viem";
import config from "../../config";
import { BananaAbi } from "../../abis/BananaController.abi";

export const useDonate = () => {
  const chainId = useChainId();
  const {
    data,
    error: callError,
    isPending,
    writeContract,
  } = useWriteContract();

  const {
    isLoading: isTxLoading,
    error: txError,
    isSuccess,
  } = useWaitForTransactionReceipt({
    hash: data,
  });

  const donate = useCallback(
    async (
      erc20TokenAddress: Hex,
      donationAmount: bigint,
      streamerAddress: string,
      donorName: string,
      message: string,
    ) => {
      if (!isPending) {
        writeContract({
          address: config.bananaControllerAddress[
            chainId as keyof (typeof config)["bananaControllerAddress"]
          ] as `0x${string}`,
          abi: BananaAbi,
          functionName: "fakeDonate",
          args: [
            streamerAddress,
            erc20TokenAddress,
            parseEther(donationAmount.toString()),
            donorName,
            message,
          ],
        });
      }
    },
    [writeContract, chainId, isPending],
  );

  const isLoading = useMemo(
    () => isPending || isTxLoading,
    [isPending, isTxLoading],
  );

  const error = useMemo(() => callError || txError, [callError, txError]);

  return { donate, isSuccess, error, isLoading };
};
