import { VAULT_DECLARATIONS } from "./vaults";

export type SupportedChainIdNames = "mainnet";
export type ContractNamespace = "tokens" | "vaults";
export type VaultDeclarations = typeof VAULT_DECLARATIONS;
export type VaultNames = keyof VaultDeclarations;

export type VaultDef = {
  id: string;
  nspace: ContractNamespace;
  address: string;
  name: string;
  description: string;
  emoji: string;
};
export type VaultDefs = Partial<Record<VaultNames, VaultDef>>;
export type ChainIdVaults = Partial<Record<SupportedChainIdNames, VaultDefs>>;
