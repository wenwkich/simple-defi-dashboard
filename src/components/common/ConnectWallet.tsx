import React from "react";
import { truncateAddress } from "../../utils";
import _ from "lodash";
import { useEthers } from "@usedapp/core";
import { activateWeb3Onboard } from "./activateWeb3Onboard";

export const ConnectWallet = () => {
  const { activate, account } = useEthers();

  return (
    <div className="connect flex justify-center items-center grow-0">
      <div className="h-30">
        <button
          type="button"
          className="block bg-white hover:bg-gray-100 border border-gray-200 font-medium rounded-xl text-sm px-5 py-3 text-center items-center"
          onClick={() => activateWeb3Onboard(activate)}
        >
          {account ? (
            <div className="text-red-600">{truncateAddress(account)}</div>
          ) : (
            "Connect Wallet"
          )}
        </button>
      </div>
    </div>
  );
};
