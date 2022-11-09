import _ from "lodash";
import React, { useEffect } from "react";
import { useQuery, QueryObserverOptions } from "@tanstack/react-query";
import { useEthersOptions } from "../ethers/useEthersOptions";
import { AsyncFunc } from "../../sdk/types";
import { checkChainNameSupported } from "../../utils/constants/chains";

export const useOnBlockRefetchQuery = <T>(
  key: string,
  call: AsyncFunc<T>,
  enabled?: boolean
) => {
  const { chainName, provider } = useEthersOptions();

  const queryResult = useQuery([key, chainName, enabled], call, {
    retry: true,
    enabled:
      enabled === undefined
        ? !!provider && checkChainNameSupported(chainName)
        : enabled,
    onError: (err) => console.error(err),
  });

  const { refetch } = queryResult;

  useEffect(() => {
    provider?.on("block", () => {
      refetch();
    });
  }, [provider]);

  return queryResult;
};
