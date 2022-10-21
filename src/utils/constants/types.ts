import { VAULTS_DEF } from "./vaults";

export type SupportedChainIdNames = "localhost" | "goerli";
export type VaultsDef = typeof VAULTS_DEF;
export type VaultNames = keyof VaultsDef;

export type Vault = {
  address: string;
  name: string;
  description: string;
  emoji: string;
};
export type Vaults = Partial<Record<VaultNames, Vault>>;
export type ChainIdVaults = Partial<Record<SupportedChainIdNames, Vaults>>;
