import React from "react";
import { ConnectWallet } from "./ConnectWallet";
import _ from "lodash";
import { useEthers } from "@usedapp/core";
import { checkChainIdSupported } from "../../utils/constants/chains";

export const withConnectWallet =
  <P extends object>(WrappedComponent: React.ComponentType<P>): React.FC<P> =>
  (props) => {
    const { account, chainId } = useEthers();
    const chainIdSupported = checkChainIdSupported(chainId);

    return account ? (
      !chainIdSupported ? (
        <div className="connect flex justify-center items-center grow-0">
          <div className="h-30 block bg-white hover:bg-gray-100 border border-gray-200 font-medium rounded-xl text-sm px-5 py-2.5 text-center items-center">
            Unknown chain
          </div>
        </div>
      ) : (
        <WrappedComponent {...props} />
      )
    ) : (
      <div>Please connect your wallet.</div>
    );
  };
