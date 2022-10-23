import { ethers } from "ethers";
import {
  ContractNamespace,
  SupportedChainIdNames,
} from "../utils/constants/types";
import { Call, Contract } from "ethcall";

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
  name: string;
  symbol: string;
  decimals: string;
  address: string;
}

export type TokenInfos = Record<
  string,
  (TokenInfo & MulticallResultBase) | undefined
>;

export interface SdkOptions {
  chainId: SupportedChainIdNames;
  provider: ethers.providers.BaseProvider;
  signer: ethers.Signer;
}

export interface MulticallResultBase {
  address: string;
  nspace: string;
  [key: string]: any;
}

export interface MulticallInput<T> {
  inputInfos: MulticallResultBase[];
  contractMapper: (input: string) => Contract;
  callMappers: ((contract: Contract) => Call)[];
  resultsMapper: (resultBase: MulticallResultBase) => (callResults: any[]) => T;
}

export type MulticallInputs<T> = Partial<
  Record<ContractNamespace, MulticallInput<T>>
>;

export type SdkReadOptions = Omit<SdkOptions, "signer">;
export type SdkWriteOptions = Omit<SdkOptions, "provider">;

export type AsyncFunc<R> = (...args: Array<any>) => Promise<R>;

export type EthersFactory<P, R> = (ethersPartial: P) => AsyncFunc<R>;
export type EthersWriteFactory<R> = EthersFactory<SdkWriteOptions, R>;
export type EthersReadFactory<R> = EthersFactory<SdkReadOptions, R>;
