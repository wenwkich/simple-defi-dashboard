import { ethers } from "ethers";

import { MulticallResultBase } from "declarative-multicall";
import {
  ContractNamespace,
  SupportedChainIdNames,
} from "../utils/constants/types";

// key of the record: address
export type Infos<T> = Record<string, T & MulticallResultBase>;

export type Results<T> = Partial<Record<ContractNamespace, Infos<T>>>;

export type VaultInfo = {
  cap: number;
  decimals: number;
  asset: string;
  totalDeposited: number;
};
export type VaultInfos = Infos<VaultInfo>;

export type Balance = {
  balance: number;
};

export type VaultSignInInfo = Balance;
// mapping from address to its balance
export type VaultSignInInfos = Record<string, VaultSignInInfo>;

export type TokenSignInInfo = Balance;
export interface TokenInfo {
  symbol: string;
  decimals: string;
  address: string;
}

export type TokenInfos = Record<
  string,
  (TokenInfo & MulticallResultBase) | undefined
>;

export interface SdkOptions {
  chainName: SupportedChainIdNames;
  provider: ethers.providers.BaseProvider;
  signer: ethers.Signer;
}

export type SdkReadOptions = Omit<SdkOptions, "signer">;
export type SdkWriteOptions = Omit<SdkOptions, "provider">;

export type AsyncFunc<R> = (...args: Array<any>) => Promise<R>;

export type EthersFactory<P, R> = (ethersPartial: P) => AsyncFunc<R>;
export type EthersWriteFactory<R> = EthersFactory<Partial<SdkWriteOptions>, R>;
export type EthersReadFactory<R> = EthersFactory<Partial<SdkReadOptions>, R>;
