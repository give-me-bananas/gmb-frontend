import { useCallback, useMemo } from "react";
import {
  useChainId,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { BananaAbi } from "../../abis/BananaController.abi";
import config from "../../config";

export const useRegisterAccount = () => {
  const chainId = useChainId();
  const {
    data,
    isPending,
    error: callError,
    writeContract,
  } = useWriteContract();

  const {
    isLoading: isTxLoading,
    error: txError,
    isSuccess,
  } = useWaitForTransactionReceipt({
    hash: data,
  });

  const registerAccount = useCallback(async () => {
    if (!isPending) {
      writeContract({
        address: config.bananaControllerAddress[
          chainId as keyof (typeof config)["bananaControllerAddress"]
        ] as `0x${string}`,
        abi: BananaAbi,
        functionName: "registerAsStreamer",
      });
    }
  }, [writeContract, isPending, chainId]);

  const isLoading = useMemo(
    () => isPending || isTxLoading,
    [isPending, isTxLoading],
  );

  const error = useMemo(() => callError || txError, [callError, txError]);
  return { registerAccount, isSuccess, error, isLoading };
};
