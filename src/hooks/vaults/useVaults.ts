import _ from "lodash";
import React, { useCallback } from "react";
import { getVaultInfosSdk } from "../../sdk";
import { useEthersOptions } from "../ethers/useEthersOptions";
import { useOnBlockRefetchQuery } from "../utils/useOnBlockRefetchQuery";

/**
 *
 * @returns
 */
export const useVaults = () => {
  const { chainName, provider } = useEthersOptions();

  const getVaultsInfo = getVaultInfosSdk({ provider, chainName });

  const queryResult = useOnBlockRefetchQuery("vaultInfos", getVaultsInfo);

  return {
    ...queryResult,
    getAllVaults: useCallback(
      () => queryResult.data?.vaults,
      [queryResult.data]
    ),
    getAssetAddresses: useCallback(
      () => _.uniq(_.map(queryResult.data?.vaults, (details) => details.asset)),
      [queryResult.data]
    ),
    getVault: useCallback(
      (address: string) =>
        queryResult.data?.vaults
          ? queryResult.data?.vaults[address]
          : undefined,
      [queryResult.data]
    ),
    getVaults: useCallback(
      (addresses: string[]) =>
        _.filter(queryResult.data?.vaults, (detail) =>
          _.includes(addresses, detail.id)
        ),
      [queryResult.data]
    ),
  };
};
