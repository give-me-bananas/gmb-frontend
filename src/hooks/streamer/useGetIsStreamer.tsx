import { useChainId, useContractRead } from "wagmi";
import { BananaAbi } from "../../abis/BananaController.abi";
import config from "../../config";

export const useGetIsStreamer = (address: string | undefined) => {
  const chainId = useChainId();
  const { data, error, isSuccess, isLoading } = useContractRead({
    address: config.bananaControllerAddress[
      chainId as keyof (typeof config)["bananaControllerAddress"]
    ] as `0x${string}`,
    abi: BananaAbi,
    functionName: "isStreamer",
    args: [address],
  });

  return { data, isSuccess, error, isLoading } as {
    data: boolean | undefined;
    isSuccess: boolean;
    error: Error | undefined;
    isLoading: boolean;
  };
};
