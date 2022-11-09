import deployments from "./deployments/ribbon-deployments.json";
import _ from "lodash";
import { VaultDefs, VaultNames } from "./types";
import { SupportedChainIdNames } from "../../utils/constants/types";

const deploymentsCasted = deployments as Partial<
  Record<SupportedChainIdNames | string, Record<VaultNames | string, string>>
>;

// define your basic info in this page
export const VAULT_DECLARATIONS = {
  RibbonDeltaVaultETHCall: {
    name: "Ribbon Delta ETH Call Vault",
  },
  RibbonThetaVaultAAVECall: {
    name: "Ribbon Theta AAVE Call Vault",
  },
  RibbonThetaVaultETHCall: {
    name: "Ribbon Theta ETH Call Vault",
  },
  RibbonThetaVaultSTETHCall: {
    name: "Ribbon Theta STETH Call Vault",
  },
  RibbonThetaVaultRETHCall: {
    name: "Ribbon Theta RETH Call Vault",
  },
  RibbonThetaVaultWBTCCall: {
    name: "Ribbon Theta WBTC Call Vault",
  },
  RibbonThetaYearnVaultETHPut: {
    name: "Ribbon Theta ETH Put Vault",
  },
  RibbonThetaVaultAPECall: {
    name: "Ribbon Theta APE Call Vault",
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
