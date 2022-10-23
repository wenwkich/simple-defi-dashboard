import React from "react";
import { Link } from "react-router-dom";
import { withConnectWallet } from "../components/common/withConnectWallet";
import VaultsComp from "../components/home/Vaults";

function Vaults() {
  return (
    <div className="flex relative flex-col overflow-y-visible items-center gap-4">
      <VaultsComp />
    </div>
  );
}

export default withConnectWallet(Vaults);
