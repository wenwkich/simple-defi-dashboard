import { useQuery } from "@tanstack/react-query";
import { tokenAllowanceSdk } from "../../sdk/approve";
import { useEthersOptions } from "../ethers/useEthersOptions";
import { useOnBlockRefetchQuery } from "../utils/useOnBlockRefetchQuery";

export function useTokenAllowance(
  spenderAddress: string,
  tokenAddress: string
) {
  const { account, provider } = useEthersOptions();

  const tokenAllowance = tokenAllowanceSdk({ provider });

  return useOnBlockRefetchQuery("allowance", async () => {
    return account
      ? await tokenAllowance(account, spenderAddress, tokenAddress)
      : 0;
  });
}
