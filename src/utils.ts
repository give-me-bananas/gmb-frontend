import { encodeFunctionData } from "viem";
import * as BananaController from "./abis/BananaController.abi.json";
import * as IERC20 from "./abis/IERC20.json";

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

export function encodeApproveFunction(spender: string, value: bigint) {
  const data = encodeFunctionData({
    abi: IERC20.abi,
    args: [spender, BigInt(value)],
    functionName: "approve",
  });

  return data;
}
