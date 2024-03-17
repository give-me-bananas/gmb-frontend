import { useCallback, useMemo } from "react";
import { erc20ABI, useContractWrite, useWaitForTransaction } from "wagmi";

export const useErc20Approve = (
  tokenAddress: `0x${string}`,
  spenderAddress: `0x${string}`,
) => {
  const {
    data,
    error: callError,
    isLoading: isCallLoading,
    write,
  } = useContractWrite({
    address: tokenAddress,
    abi: erc20ABI,
    functionName: "approve",
  });

  const {
    isLoading: isTxLoading,
    error: txError,
    isSuccess,
  } = useWaitForTransaction({
    hash: data?.hash,
  });

  const approve = useCallback(
    async (amount: bigint) => {
      write({
        args: [spenderAddress, amount],
      });
    },
    [write, spenderAddress],
  );

  const isLoading = useMemo(
    () => isCallLoading || isTxLoading,
    [isCallLoading, isTxLoading],
  );

  const error = useMemo(() => callError || txError, [callError, txError]);

  return { approve, isSuccess, error, isLoading };
};
