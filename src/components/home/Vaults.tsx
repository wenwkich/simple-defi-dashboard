import React, { useMemo, useState } from "react";
import { useVaults } from "../../hooks/vaults/useVaults";
import VaultCard from "./VaultCard";
import _ from "lodash";
import { useAssetInfos } from "../../hooks/tokens/useAssetInfos";
import { Link } from "react-router-dom";
import { Skeleton, Tag, TagLabel } from "@chakra-ui/react";

export function Vaults() {
  const { getAllVaults, isLoading } = useVaults();

  const vaults = getAllVaults();

  // TODO: sort by
  return (
    <>
      {isLoading ? (
        <Skeleton>Loading</Skeleton>
      ) : (
        <div className="flex flex-col mt-10 w-full">
          <div className="grid grid-cols-3 content-start justify-center gap-4 flex-wrap mt-4 mb-20">
            {_.map(vaults, (details, key) => (
              <Link to={`/vaults/${details.address}`}>
                <VaultCard key={key} vault={details} />
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Vaults;
