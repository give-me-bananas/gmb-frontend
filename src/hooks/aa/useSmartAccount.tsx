import { ENTRYPOINT_ADDRESS_V06 } from "permissionless";
import {
  SimpleSmartAccount,
  signerToSimpleSmartAccount,
} from "permissionless/accounts";
import { Transport } from "viem";
import { useAccount, usePublicClient } from "wagmi";
import { useSmartAccountSigner } from "./useSmartAccountSigner";
import { useGlobalState } from "../../reducer";
import { useEffect } from "react";
import { useGetRegisteredSmartAccount } from "../apis/useGetRegisteredSmartAccount";
import { ENTRYPOINT_ADDRESS_V06_TYPE } from "permissionless/types";
import { useUpdateRegisteredSmartAccount } from "../apis/useUpdateRegisteredSmartAccount";

export const FACTORY_ADDRESS = "0x9406Cc6185a346906296840746125a0E44976454";

export const useSmartAccount = () => {
  const signer = useSmartAccountSigner();
  const publicClient = usePublicClient();
  const { address } = useAccount();
  const smartAccountAddress = useGetRegisteredSmartAccount(address);
  const { updateRegisteredSmartAccount } = useUpdateRegisteredSmartAccount();
  const { dispatch, state } = useGlobalState();

  useEffect(() => {
    const asyncFn = async () => {
      if (signer && publicClient) {
        const simpleSmartAccountClient = await signerToSimpleSmartAccount(
          publicClient,
          {
            entryPoint: ENTRYPOINT_ADDRESS_V06,
            signer,
            factoryAddress: FACTORY_ADDRESS,
            address: smartAccountAddress,
          },
        );

        if (!smartAccountAddress) {
          updateRegisteredSmartAccount(
            address as `0x${string}`,
            simpleSmartAccountClient.address,
          );
        }

        dispatch({
          type: "setSmartAccount",
          smartAccount: simpleSmartAccountClient,
        });
      }
    };

    asyncFn();
  }, [signer, publicClient, dispatch, smartAccountAddress, address]);

  return state.smartAccount as SimpleSmartAccount<
    ENTRYPOINT_ADDRESS_V06_TYPE,
    Transport,
    undefined
  >;
};
