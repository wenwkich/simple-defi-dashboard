import _ from "lodash";
import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useEthersOptions } from "../ethers/useEthersOptions";
import { AsyncFunc } from "../../sdk/types";
import { checkChainNameSupported } from "../../utils/constants/chains";

export const useOnBlockRefetchQuery = <T>(key: string, call: AsyncFunc<T>) => {
  const { chainName, provider } = useEthersOptions();

  const queryResult = useQuery([key, chainName], call, {
    retry: false,
    enabled: !!provider && checkChainNameSupported(chainName),
  });

  const { refetch } = queryResult;

  useEffect(() => {
    provider?.on("block", () => {
      refetch();
    });
  }, [provider]);

  return queryResult;
};
