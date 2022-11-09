import _ from "lodash";
import { formatUnits } from "ethers/lib/utils";
import {
  EthersReadFactory,
  Results,
  TokenInfo,
  TokenSignInInfo,
  VaultInfo,
  VaultInfos,
  VaultSignInInfo,
  VaultSignInInfos,
} from "./types";
import { Vault__factory } from "../utils/typechain";
import { doMulticall, MulticallOption } from "declarative-multicall";
import { getVaultDefs } from "../utils/constants/vaults";
import { erc20Abi } from "../utils";

export const getVaultInfosSdk: EthersReadFactory<Results<VaultInfos>> =
  ({ provider, chainName }) =>
  async () => {
    const nspace = "vaults";

    const vaultDefs = getVaultDefs(chainName);

    const toVaultParamCall = (contract: any) => contract.vaultParams();
    const tototalBalanceCalls = (contract: any) => contract.totalBalance();

    const vaultsInput: MulticallOption<VaultInfo> = {
      inputInfos: _.map(vaultDefs, (def) => ({
        address: def!.address,
        id: def!.id,
        nspace,
      })),
      abi: Vault__factory.abi,
      callMappers: [toVaultParamCall, tototalBalanceCalls],
      resultsMapper: () => (results) => {
        const [vaultParams, totalBalance] = results;
        const [, decimals, asset, , , cap] = vaultParams;
        return {
          asset,
          decimals,
          cap: parseFloat(formatUnits(cap, decimals)),
          totalDeposited: parseFloat(formatUnits(totalBalance, decimals)),
        };
      },
    };

    return doMulticall(provider, {
      vaults: vaultsInput,
    });
  };

export const getUserSignInInfosSdk: EthersReadFactory<
  Results<VaultSignInInfos | (TokenSignInInfo & TokenInfo)>
> =
  ({ provider, chainName }) =>
  async (
    userAddress: string,
    vaultInfos: Readonly<VaultInfos>,
    tokens: string[]
  ) => {
    const vaultDefs = getVaultDefs(chainName);

    const vaultAddressToBalanceCalls = (contract: any) =>
      contract.deposits(userAddress);

    const vaultsInput: MulticallOption<VaultSignInInfo> = {
      inputInfos: _.map(vaultDefs, (def) => ({
        address: def!.address,
        id: def!.id,
        nspace: "vaults",
        decimals: vaultInfos[def!.address]?.decimals,
      })),
      abi: Vault__factory.abi,
      callMappers: [vaultAddressToBalanceCalls],
      resultsMapper: (info) => (results) => {
        const [deposit] = results;
        const { decimals } = info;
        return {
          balance: parseFloat(formatUnits(deposit, decimals)),
        };
      },
    };

    const toTokenBalanceCalls = (contract: any) =>
      contract.balanceOf(userAddress);
    const toTokenNameCalls = (contract: any) => contract.name();
    const toTokenSymbolCalls = (contract: any) => contract.symbol();
    const toTokenDecimalsCalls = (contract: any) => contract.decimals();

    const tokensInput: MulticallOption<TokenSignInInfo & TokenInfo> = {
      inputInfos: _.map(tokens, (address) => ({
        address,
        nspace: "tokens",
      })),
      abi: erc20Abi,
      callMappers: [
        toTokenBalanceCalls,
        toTokenNameCalls,
        toTokenSymbolCalls,
        toTokenDecimalsCalls,
      ],
      resultsMapper:
        ({ address }) =>
        (results) => {
          const [balance, name, symbol, decimals] = results;
          return {
            balance: parseFloat(formatUnits(balance, decimals)),
            name,
            symbol,
            decimals,
            address,
          };
        },
    };

    return doMulticall(provider, {
      vaults: vaultsInput,
      tokens: tokensInput,
    });
  };
