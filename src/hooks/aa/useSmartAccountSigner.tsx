import { walletClientToSmartAccountSigner } from "permissionless";
import { useMemo } from "react";
import { useWalletClient } from "wagmi";

export const useSmartAccountSigner = () => {
  const { data: walletClient } = useWalletClient();

  const signer = useMemo(() => {
    if (walletClient) {
      return walletClientToSmartAccountSigner(walletClient);
    }

    return undefined;
  }, [walletClient]);

  return signer;
};
