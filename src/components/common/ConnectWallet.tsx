import React from "react";
import { truncateAddress } from "../../utils";
import _ from "lodash";
import { useEthers } from "@usedapp/core";

export const ConnectWallet = () => {
  const { activateBrowserWallet: connect, account } = useEthers();

  return (
    <button
      type="button"
      className="block bg-white hover:bg-gray-100 border border-gray-200 font-medium rounded-xl text-sm px-5 py-2.5 text-center items-center"
      onClick={connect}
    >
      {account ? (
        <div className="text-red-600">{truncateAddress(account)}</div>
      ) : (
        "Connect Wallet"
      )}
    </button>
  );
};
