import deployments from "../deployments/deployments.json";
import _ from "lodash";
import { SupportedChainIdNames, VaultDefs, VaultNames } from "./types";

const deploymentsCasted = deployments as Partial<
  Record<SupportedChainIdNames, Record<VaultNames | string, string>>
>;

// define your basic info in this page
export const VAULT_DECLARATIONS = {
  ETH_VAULT: {
    name: "ETH Garden",
    description: "Maximize your ETH yield",
    emoji: "🌻",
  },
  AVAX_VAULT: {
    name: "AVAX Shark",
    description: "Stake AVAX for maximum rewards",
    emoji: "🦈",
  },
  WBTC_VAULT: {
    name: "WBTC Hodl",
    description: "BTC is your best choice to hodl",
    emoji: "🌟",
  },
};

export const getVaultDef = (
  chainId: SupportedChainIdNames,
  vaultId: VaultNames
) => {
  return getVaultDefs(chainId)[vaultId];
};

export const getVaultDefs = (chainId: SupportedChainIdNames) => {
  return _.reduce(
    VAULT_DECLARATIONS,
    (prev, curr, key) => {
      const vaults = deploymentsCasted[chainId];
      if (!vaults) {
        throw new Error("chainId not found in deployments");
      }
      return {
        ...prev,
        [key]: {
          id: key,
          nspace: "vault",
          address: vaults[key],
          ...curr,
        },
      };
    },
    {} as VaultDefs
  );
};
