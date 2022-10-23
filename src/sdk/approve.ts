import { ethers, Transaction } from "ethers";
import { formatUnits } from "ethers/lib/utils";
import { erc20Abi } from "../utils";
import { EthersReadFactory, EthersWriteFactory } from "./types";

/**
 * deposit native token function that has dealt with string and decimals
 * @param signer
 * @param chainId
 * @returns
 */
export const tokenApproveSdk: EthersWriteFactory<Transaction> =
  ({ signer }) =>
  async (spenderAddress: string, tokenAddress: string) => {
    const vaultContract = new ethers.Contract(tokenAddress, erc20Abi, signer);

    const tx = await vaultContract.approve(
      spenderAddress,
      "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
    );
    return tx;
  };

export const tokenAllowanceSdk: EthersReadFactory<number> =
  ({ provider }) =>
  async (
    ownerAddress: string,
    spenderAddress: string,
    tokenAddress: string
  ) => {
    const vaultContract = new ethers.Contract(tokenAddress, erc20Abi, provider);
    return parseFloat(
      formatUnits(await vaultContract.allowance(ownerAddress, spenderAddress))
    );
  };
