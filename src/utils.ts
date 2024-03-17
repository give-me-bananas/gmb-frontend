import { encodeFunctionData } from "viem";
import * as BananaController from "./abis/BananaController.abi.json";

export function encodeDonateFunction(
  recipient: string,
  erc20TokenAddress: string,
  amount: bigint,
  donorName: string,
  message: string,
) {
  const data = encodeFunctionData({
    abi: BananaController.abi,
    args: [recipient, erc20TokenAddress, BigInt(amount), donorName, message],
    functionName: "donate",
  });

  return data;
}

export function encodeApproveFunction() {}
