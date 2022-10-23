import _ from "lodash";
import React, { useCallback, useMemo } from "react";
import { useUserSignInInfos } from "../signin/useUserSignInInfos";

/**
 * get all the collateral token infos from the vault,
 * including token balance and native token info,
 * indexed with token address
 * collateral token are the token that user actually deposit,
 * e.g. for ETH call, it will be the ETH
 * for ETH put, it will be USDC
 * @returns `useQuery` result, data will include a object that has all the token indexed by the address
 */
export const useAssetInfos = () => {
  const { getAllTokenInfos, getTokenBalance } = useUserSignInInfos();

  return {
    tokens: getAllTokenInfos(),
    getTokenBalance,
  };
};
