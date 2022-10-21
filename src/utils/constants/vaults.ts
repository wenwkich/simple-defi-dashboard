import deployments from "../deployments/deployments.json";
import _ from "lodash";
import { SupportedChainIdNames, VaultNames, Vaults } from "./types";

const deploymentsCasted = deployments as Partial<
  Record<SupportedChainIdNames, Record<VaultNames | string, string>>
>;

// define your basic info in this page
export const VAULTS_DEF = {
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

export const getVaultInfo = (
  chainId: SupportedChainIdNames,
  vaultId: VaultNames
) => {
  return getVaultInfos(chainId)[vaultId];
};

export const getVaultInfos = (chainId: SupportedChainIdNames) => {
  return _.reduce(
    VAULTS_DEF,
    (prev, curr, key) => {
      const vault = deploymentsCasted[chainId];
      if (!vault) {
        throw new Error("chainId not found in deployments");
      }
      return {
        ...prev,
        [key]: {
          address: vault[key],
          ...curr,
        },
      };
    },
    {} as Vaults
  );
};
