import { useEthers } from "@usedapp/core";
import { useEffect } from "react";
import {
  checkChainIdSupported,
  getChainNameFromChainId,
  getSupportedChainsStr,
} from "../../utils/constants/chains";
import { useErrorToast } from "../ui/useErrorToast";

export function useEthersOptions() {
  const { library, chainId, account } = useEthers();
  const errorToast = useErrorToast();

  const signer = library?.getSigner();

  useEffect(() => {
    if (!checkChainIdSupported(chainId)) {
      errorToast(
        new Error(
          `chainId not supported, supported chains: ${getSupportedChainsStr()}`
        )
      );
    }
  }, [chainId]);

  return {
    chainName: getChainNameFromChainId(chainId) || "localhost",
    signer,
    provider: library,
    account,
  };
}
