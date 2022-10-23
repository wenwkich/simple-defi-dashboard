import deployments from "../deployments/deployments.json";
import _ from "lodash";
import { SupportedChainIdNames, VaultDefs, VaultNames } from "./types";

const deploymentsCasted = deployments as Partial<
  Record<SupportedChainIdNames | string, Record<VaultNames | string, string>>
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

export const getVaultDefs = (
  chainName: SupportedChainIdNames | string | undefined
) => {
  return _.reduce(
    VAULT_DECLARATIONS,
    (prev, curr, key) => {
      if (!chainName) {
        throw new Error("Chain is not valid");
      }
      const vaults = deploymentsCasted[chainName];
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
