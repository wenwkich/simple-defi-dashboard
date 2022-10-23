import { ethers, Transaction } from "ethers";
import { parseEther, parseUnits } from "ethers/lib/utils";
import { numToString } from "../utils";
import { EthersWriteFactory } from "./types";
import { Vault__factory } from "../utils/typechain";

export const depositNativeSdk: EthersWriteFactory<Promise<Transaction>> =
  ({ signer }) =>
  async (address: string, amount: number) => {
    const vaultContract = new ethers.Contract(
      address,
      Vault__factory.abi,
      signer
    );
    const tx = await vaultContract.depositETH({
      value: parseEther(numToString(amount)),
    });
    return tx;
  };

export const depositSdk: EthersWriteFactory<Promise<Transaction>> =
  ({ signer }) =>
  async (address: string, amount: number, tokenDecimals?: number) => {
    const vaultContract = new ethers.Contract(
      address,
      Vault__factory.abi,
      signer
    );
    const decimals = tokenDecimals
      ? tokenDecimals
      : (await vaultContract.vaultParams())[1];
    const tx = await vaultContract.deposit(
      parseUnits(numToString(amount), decimals)
    );
    return tx;
  };
