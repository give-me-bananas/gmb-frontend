import { useCallback, useMemo } from "react";
import { useChainId, useContractWrite, useWaitForTransaction } from "wagmi";
import { BananaAbi } from "../../abis/BananaController.abi";
import config from "../../config";

export const useRegisterAccount = () => {
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
    functionName: "registerAsStreamer",
  });
  const {
    isLoading: isTxLoading,
    error: txError,
    isSuccess,
  } = useWaitForTransaction({
    hash: data?.hash,
  });

  const registerAccount = useCallback(async () => {
    if (!isCallLoading) {
      write({});
    }
  }, [write, isCallLoading]);

  const isLoading = useMemo(
    () => isCallLoading || isTxLoading,
    [isCallLoading, isTxLoading],
  );

  const error = useMemo(() => callError || txError, [callError, txError]);
  return { registerAccount, isSuccess, error, isLoading };
};
