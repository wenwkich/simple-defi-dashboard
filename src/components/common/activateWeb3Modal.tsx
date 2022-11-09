import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { providers } from "ethers";

type JsonRpcProvider = providers.JsonRpcProvider;
type ExternalProvider = providers.ExternalProvider;
type SupportedProvider =
  | JsonRpcProvider
  | ExternalProvider
  | {
      getProvider: () =>
        | Promise<JsonRpcProvider | ExternalProvider>
        | JsonRpcProvider
        | ExternalProvider;
      activate: () => Promise<any>;
    };

export const activateWeb3Modal = async (
  activate: (provider: SupportedProvider) => Promise<void>
) => {
  const providerOptions = {
    injected: {
      display: {
        name: "Metamask",
        description: "Connect with the provider in your Browser",
      },
      package: null,
    },
    // walletconnect: {
    //   package: WalletConnectProvider,
    //   options: {
    //     bridge: "https://bridge.walletconnect.org",
    //   },
    // },
  };
  const web3Modal = new Web3Modal({
    providerOptions,
  });
  const provider = await web3Modal.connect();
  await activate(provider);
};
