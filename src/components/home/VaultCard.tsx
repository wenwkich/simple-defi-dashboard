import { MulticallResultBase } from "declarative-multicall";
import { Balance, VaultInfo } from "../../sdk/types";
import { nFormatter } from "../../utils";

type Props = {
  vault: VaultInfo & MulticallResultBase;
  deposited: number;
  balance: number;
};

export default function VaultCard({ vault, deposited, balance }: Props) {
  return (
    <div className="container flex bg-white gap-2 flex-col flex-grow-0 flex-shrink-0 border h-auto w-vault rounded-xl">
      <div className="px-6 py-4 flex flex-col gap-2">
        <div className="flex flex-row gap-2">
          <div className="text-2xl font-semibold">{vault.name}</div>
        </div>
        <div className="flex flex-row justify-between">
          Total Deposit: {nFormatter(vault.totalDeposited, 2)} /{" "}
          {nFormatter(vault.cap, 2)}
        </div>
        <div className="flex flex-row justify-between">
          You Deposited: {deposited === undefined ? "..." : deposited}
        </div>
        <div className="flex flex-row justify-between">
          Your Balance: {deposited === undefined ? "..." : balance}
        </div>
      </div>
    </div>
  );
}
