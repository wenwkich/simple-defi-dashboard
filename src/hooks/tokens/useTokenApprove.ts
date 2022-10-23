import { Transaction } from "ethers";
import React, { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useErrorToast } from "../ui/useErrorToast";
import { useTxSubmittedToast } from "../ui/useTxSubmittedToast";
import { useTxSuccessToast } from "../ui/useTxSuccessToast";
import { tokenApproveSdk } from "../../sdk/approve";
import { useEthersOptions } from "../ethers/useEthersOptions";

export default function useTokenApprove() {
  const queryClient = useQueryClient();
  const txSuccessToast = useTxSuccessToast();
  const txSubmittedToast = useTxSubmittedToast();
  const errorToast = useErrorToast();

  const { signer } = useEthersOptions();
  const tokenApprove = tokenApproveSdk({ signer });

  return useCallback(async (spenderAddress: string, tokenAddress: string) => {
    try {
      let tx = await tokenApprove(spenderAddress, tokenAddress);
      txSubmittedToast(tx);

      await (tx as any).wait();

      await queryClient.invalidateQueries(["allowance"]);
      txSuccessToast(tx);
    } catch (error: any) {
      console.log(error);
      errorToast(error);
    }
  }, []);
}
