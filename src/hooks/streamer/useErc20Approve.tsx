import { useCallback, useMemo } from "react";
import { erc20Abi } from "viem";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";

export const useErc20Approve = (
  tokenAddress: `0x${string}`,
  spenderAddress: `0x${string}`,
) => {
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

  const approve = useCallback(
    async (amount: bigint) => {
      writeContract({
        address: tokenAddress,
        abi: erc20Abi,
        functionName: "approve",
        args: [spenderAddress, amount],
      });
    },
    [writeContract, spenderAddress],
  );

  const isLoading = useMemo(
    () => isPending || isTxLoading,
    [isPending, isTxLoading],
  );

  const error = useMemo(() => callError || txError, [callError, txError]);

  return { approve, isSuccess, error, isLoading };
};
