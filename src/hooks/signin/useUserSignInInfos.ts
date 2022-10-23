import _ from "lodash";
import React, { useCallback, useMemo } from "react";
import { getUserSignInInfosSdk } from "../../sdk";
import { Balance, Infos, TokenInfo } from "../../sdk/types";
import { useEthersOptions } from "../ethers/useEthersOptions";
import { useOnBlockRefetchQuery } from "../utils/useOnBlockRefetchQuery";
import { useVaults } from "../vaults/useVaults";

/**
 *
 * @returns
 */
export const useUserSignInInfos = () => {
  const { chainName, provider, account } = useEthersOptions();

  // this hook depends on useVaults hook
  const { data: vaultData, getAssetAddresses } = useVaults();
  const assets = useMemo(() => getAssetAddresses(), [vaultData]);
  const getUserSignInInfos = getUserSignInInfosSdk({ provider, chainName });

  const queryResult = useOnBlockRefetchQuery("signIn", () =>
    getUserSignInInfos(account, vaultData, assets)
  );

  return {
    ...queryResult,
    getAllVaultBalances: useCallback(
      () => queryResult.data?.vaults,
      [queryResult.data]
    ),
    getVaultBalance: useCallback(
      (address: string) =>
        queryResult.data?.vaults
          ? queryResult.data?.vaults[address].balance
          : undefined,
      [queryResult.data]
    ),
    getAllTokenInfos: useCallback(
      () => queryResult.data?.tokens as Infos<Balance & TokenInfo> | undefined,
      [queryResult.data]
    ),
    getTokenBalance: useCallback(
      (address: string) =>
        queryResult.data?.tokens
          ? queryResult.data?.tokens[address].balance
          : undefined,
      []
    ),
  };
};
