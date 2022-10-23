import React, { useMemo } from "react";
import { Navigate, useParams } from "react-router";
import { useVaults } from "../hooks/vaults/useVaults";
import { withConnectWallet } from "../components/common/withConnectWallet";
import { Skeleton } from "@chakra-ui/react";

function Details(props: any) {
  const { id } = useParams();

  const { getVault, isLoading } = useVaults();
  const vault = useMemo(() => (id ? getVault(id) : undefined), [id, getVault]);

  return isLoading ? (
    <Skeleton>Loading</Skeleton>
  ) : vault ? (
    <div className="container flex flex-col gap-10 px-32 items-stretch">
      <div className="flex flex-row gap-4 grow-0 basis-1/2 items-start">
        <div className="flex flex-col gap-4 basis-3/5">WIP</div>
      </div>
    </div>
  ) : (
    <Navigate to="/not-found" />
  );
}
export default withConnectWallet(Details);
