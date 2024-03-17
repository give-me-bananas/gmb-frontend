import { createPimlicoPaymasterClient } from "permissionless/clients/pimlico";
import { useSmartAccount } from "./useSmartAccount";
import { http } from "viem";
import {
  ENTRYPOINT_ADDRESS_V06,
  SmartAccountClient,
  createSmartAccountClient,
} from "permissionless";
import { useEffect, useState } from "react";
import { ENTRYPOINT_ADDRESS_V06_TYPE } from "permissionless/types";
import { useNetwork } from "wagmi";
import config from "../../config";

const PIMLICO_API_KEY = import.meta.env.VITE_PIMLICO_API_KEY;

export const FACTORY_ADDRESS = "0x9406Cc6185a346906296840746125a0E44976454";

/**
 * The differences between this and the useSmartAccount is that
 * this allows for the creation of clients that interacts with smart contract as if
 * its a native wallet.
 *
 * Always use this, unless you have a special reason to use the useSmartAccount hook.
 */
export const useSmartAccountClient = () => {
  const smartAccount = useSmartAccount();
  const { chain } = useNetwork();
  const [saClient, setSAClient] =
    useState<SmartAccountClient<ENTRYPOINT_ADDRESS_V06_TYPE>>();

  useEffect(() => {
    if (smartAccount && chain) {
      const canonicalName =
        config.chainCannonicalName[
          chain.id as keyof typeof config.chainCannonicalName
        ];

      const pimlicoPaymasterClient = createPimlicoPaymasterClient({
        chain,
        transport: http(
          `https://api.pimlicoio/v2/${canonicalName}/rpc?apikey=${PIMLICO_API_KEY}`,
        ),
        entryPoint: ENTRYPOINT_ADDRESS_V06,
      });

      const smartAccountClient = createSmartAccountClient({
        account: smartAccount,
        chain,
        bundlerTransport: http(
          `https://api.pimlicoio/v2/${canonicalName}/rpc?apikey=${PIMLICO_API_KEY}`,
        ),
        entryPoint: ENTRYPOINT_ADDRESS_V06,
        middleware: {
          sponsorUserOperation: pimlicoPaymasterClient.sponsorUserOperation, // optional, if using a paymaster
        },
      });

      setSAClient(smartAccountClient);
    }
  }, [smartAccount, chain]);

  return saClient;
};
