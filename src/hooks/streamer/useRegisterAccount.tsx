import { useCallback, useMemo, useState } from "react";
import { useSmartAccountClient } from "../aa/useSmartAccountClient";
import { useChainId, useWaitForTransaction } from "wagmi";
import { BananaAbi } from "../../abis/BananaController.abi";
import config from "../../config";

export const useRegisterAccount = () => {
  const saClient = useSmartAccountClient();
  const chainId = useChainId();
  const [isCallLoading, setIsCallLoading] = useState<boolean>(false);
  const [txHash, setTxHash] = useState<`0x${string}`>();
  const {
    isLoading: isTxLoading,
    error,
    isSuccess,
  } = useWaitForTransaction({
    hash: txHash,
  });

  const registerAccount = useCallback(async () => {
    if (saClient) {
      setIsCallLoading(true);
      const txHash = await saClient.writeContract({
        address:
          config.bananaControllerAddress[
            chainId as keyof (typeof config)["bananaControllerAddress"]
          ],
        abi: BananaAbi,
        functionName: "registerAsStreamer",
        args: [],
      });
      setTxHash(txHash);
      setIsCallLoading(false);
    }
  }, [saClient, chainId]);

  const isLoading = useMemo(
    () => isCallLoading || isTxLoading,
    [isCallLoading, isTxLoading],
  );

  return { registerAccount, isSuccess, error, isLoading };
};
