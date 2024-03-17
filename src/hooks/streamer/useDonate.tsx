import { useCallback, useMemo, useState } from "react";
import { useSmartAccountClient } from "../aa/useSmartAccountClient";
import { useWaitForTransaction } from "wagmi";

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

  const donate = useCallback(async () => {
    if (saClient) {
      setIsCallLoading(true);
      const txHash = await saClient.sendTransactions({
        transactions: [
          // Put your txs here.
        ],
      });
      setTxHash(txHash);
      setIsCallLoading(false);
    }
  }, [saClient]);

  const isLoading = useMemo(
    () => isCallLoading || isTxLoading,
    [isCallLoading, isTxLoading],
  );

  return { donate, isSuccess, error, isLoading };
};
