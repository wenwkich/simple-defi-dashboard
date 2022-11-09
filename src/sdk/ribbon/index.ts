import _ from "lodash";
import { formatUnits } from "ethers/lib/utils";
import {
  EthersReadFactory,
  Results,
  TokenInfo,
  TokenSignInInfo,
  VaultInfo,
  VaultSignInInfo,
  VaultSignInInfos,
} from "../types";
import { doMulticall, MulticallOption } from "declarative-multicall";
import { getVaultDefs } from "./vaults";
import { erc20Abi } from "../../utils";
import abi from "./deployments/abi.json";

export const getVaultInfosSdk: EthersReadFactory<Results<VaultInfo>> =
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
        name: def!.name,
        nspace,
      })),
      abi,
      callMappers: [toVaultParamCall, tototalBalanceCalls],
      resultsMapper:
        ({ address, name }) =>
        (results) => {
          const [vaultParams, totalBalance] = results;
          const [, decimals, asset, , , cap] = vaultParams;
          return {
            address,
            name,
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
  async (userAddress: string, tokens: string[]) => {
    const vaultDefs = getVaultDefs(chainName);

    const vaultAddressToBalanceCalls = (contract: any) =>
      contract.balanceOf(userAddress);
    const toVaultParamCall = (contract: any) => contract.vaultParams();

    const vaultsInput: MulticallOption<VaultSignInInfo> = {
      inputInfos: _.map(vaultDefs, (def) => ({
        address: def!.address,
        id: def!.id,
        nspace: "vaults",
      })),
      abi,
      callMappers: [vaultAddressToBalanceCalls, toVaultParamCall],
      resultsMapper:
        ({ address }) =>
        (results) => {
          const [deposit, params] = results;
          const [, decimals, , , ,] = params;

          return {
            address,
            balance: parseFloat(formatUnits(deposit, decimals)),
          };
        },
    };

    const toTokenBalanceCalls = (contract: any) =>
      contract.balanceOf(userAddress);
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
        toTokenSymbolCalls,
        toTokenDecimalsCalls,
      ],
      resultsMapper:
        ({ address }) =>
        (results) => {
          const [balance, symbol, decimals] = results;
          return {
            balance: parseFloat(formatUnits(balance, decimals)),
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
