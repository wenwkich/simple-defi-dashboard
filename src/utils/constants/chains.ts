import _ from "lodash";
import { Chain, Config, Mainnet } from "@usedapp/core";
import { getDefaultProvider } from "ethers";
import { SupportedChainIdNames } from "./types";

const chains: Record<SupportedChainIdNames | string, Chain> = {
  mainnet: Mainnet,
};

export const config: Config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: getDefaultProvider("mainnet"),
  },
};

const chainIdToName = _.reduce(
  chains,
  (prev, chain, key) => {
    return {
      ...prev,
      [chain.chainId]: key as SupportedChainIdNames,
    };
  },
  {} as Record<number, SupportedChainIdNames>
);

export const getSupportedChains = () => chains;
export const getChain = (chain: SupportedChainIdNames) => chains[chain];
export const getChainNameFromChainId = (chainId: any) => chainIdToName[chainId];
export const checkChainIdSupported = (chainId: any) =>
  !!getChainNameFromChainId(chainId);

export const checkChainNameSupported = (
  chainName: string | SupportedChainIdNames
) => !!chains[chainName];

export const getSupportedChainsStr = () =>
  _.join(
    _.map(
      chains,
      (chain: Chain, key: SupportedChainIdNames) => `${key}: ${chain.chainId}`
    ),
    ", "
  );
