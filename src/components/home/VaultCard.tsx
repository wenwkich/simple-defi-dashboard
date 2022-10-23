import React, { useMemo } from "react";
import { useAssetInfos } from "../../hooks/tokens/useAssetInfos";
import { MulticallResultBase, VaultInfo } from "../../sdk/types";

type Props = {
  vault: VaultInfo | MulticallResultBase;
};

export default function VaultCard({ vault }: Props) {
  const {} = vault;

  const { tokens } = useAssetInfos();
  const name = (!!tokens && tokens[vault.asset].name) || "loading error";

  return (
    <div className="container flex card click-pushed-down bg-white gap-2 flex-col flex-grow-0 flex-shrink-0 border h-auto w-vault rounded-xl">
      <div className="px-6 py-4 flex flex-col gap-2">
        <div className="flex flex-row gap-2">
          <div className="text-2xl font-semibold">{name}</div>
          {/* TODO: fill other info */}
        </div>
        <div className="flex flex-row justify-between"></div>
      </div>
    </div>
  );
}
