import { providers } from "ethers";
import injectedModule from "@web3-onboard/injected-wallets";
import { ethers } from "ethers";
import Onboard from "@web3-onboard/core";
import { Mainnet } from "@usedapp/core";

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

const injected = injectedModule();

const onboard = Onboard({
  wallets: [injected],
  chains: [
    {
      id: "0x1",
      token: "ETH",
      label: "Ethereum Mainnet",
      rpcUrl: Mainnet.rpcUrl || "https://rpc.ankr.com/eth",
    },
  ],
  appMetadata: {
    name: "I don't know how to call it",
    icon: "<svg><svg/>",
    description: "Demo app for Onboard V2",
    recommendedInjectedWallets: [
      { name: "MetaMask", url: "https://metamask.io" },
    ],
  },
  accountCenter: {
    desktop: {
      enabled: false,
    },
    mobile: {
      enabled: false,
    },
  },
});

export const activateWeb3Onboard = async (
  activate: (provider: SupportedProvider) => Promise<void>
) => {
  const wallets = await onboard.connectWallet();

  if (wallets[0]) {
    // create an ethers provider with the last connected wallet provider
    const ethersProvider = new ethers.providers.Web3Provider(
      wallets[0].provider,
      "any"
    );
    await activate(ethersProvider);
  }
};
