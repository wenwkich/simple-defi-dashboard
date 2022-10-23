import { Transaction } from "ethers";
import React, { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useErrorToast } from "../ui/useErrorToast";
import { useTxSubmittedToast } from "../ui/useTxSubmittedToast";
import { useTxSuccessToast } from "../ui/useTxSuccessToast";
import { useVaults } from "./useVaults";
import { depositNativeSdk, depositSdk } from "../../sdk";
import { useEthersOptions } from "../ethers/useEthersOptions";

export function useVaultsDeposit() {
  const { getVault } = useVaults();
  const queryClient = useQueryClient();
  const txSuccessToast = useTxSuccessToast();
  const txSubmittedToast = useTxSubmittedToast();
  const errorToast = useErrorToast();
  const { signer } = useEthersOptions();

  const depositNative = depositNativeSdk({ signer });
  const deposit = depositSdk({ signer });

  return useCallback(
    async (address: string | undefined, amount: number) => {
      try {
        let tx: Transaction;
        if (address == undefined) {
          tx = await depositNative(address, amount);
        } else {
          tx = await deposit(address, amount);
        }
        txSubmittedToast(tx);

        await (tx as any).wait();
        await queryClient.invalidateQueries(["vaults"]);
        await queryClient.invalidateQueries(["assets"]);

        txSuccessToast(tx);
      } catch (error: any) {
        console.log(error);
        errorToast(error);
      }
    },
    [getVault]
  );
}
