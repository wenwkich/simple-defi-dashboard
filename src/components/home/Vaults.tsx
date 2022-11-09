import React, { useMemo, useState } from "react";
import { useVaults } from "../../hooks/vaults/useVaults";
import VaultCard from "./VaultCard";
import _ from "lodash";
import { Link } from "react-router-dom";
import { Skeleton } from "@chakra-ui/react";
import { useUserSignInInfos } from "../../hooks/signin/useUserSignInInfos";

export function Vaults() {
  const { getAllVaults, isLoading } = useVaults();
  const { getVaultBalance, getTokenBalance } = useUserSignInInfos();

  const vaults = getAllVaults();

  return (
    <>
      {isLoading ? (
        <Skeleton>Loading</Skeleton>
      ) : (
        <div className="flex flex-col mt-10 w-full">
          <div className="grid grid-cols-3 content-start justify-center gap-4 flex-wrap mt-4 mb-20">
            {_.map(vaults, (details, key) => (
              <VaultCard
                key={key}
                vault={details}
                deposited={getVaultBalance(key)}
                balance={getTokenBalance(details.asset)}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Vaults;
