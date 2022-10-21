import { hexlify } from "..";
import _ from "lodash";
import { Localhost, Goerli, Chain } from "@usedapp/core";
import { SupportedChainIdNames } from "./types";

const chains: Record<SupportedChainIdNames, Chain> = {
  goerli: Goerli,
  localhost: Localhost,
};

export const getChain = (chain: SupportedChainIdNames) => chains[chain];
