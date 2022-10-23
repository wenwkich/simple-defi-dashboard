import _ from "lodash";
import { formatUnits } from "ethers/lib/utils";
import {
  EthersReadFactory,
  MulticallInput,
  Results,
  TokenInfo,
  TokenSignInInfo,
  VaultInfo,
  VaultInfos,
  VaultSignInInfo,
  VaultSignInInfos,
} from "./types";
import { Vault__factory } from "../utils/typechain";
import { doMulticall } from "./utils";
import { Contract } from "ethcall";
import { getVaultDefs } from "../utils/constants/vaults";
import { erc20Abi } from "../utils";

export const getVaultInfosSdk: EthersReadFactory<Results<VaultInfos>> =
  ({ provider, chainName }) =>
  async () => {
    const nspace = "vaults";

    const vaultDefs = getVaultDefs(chainName);
    const toContract = (vaultAddress: string) => {
      return new Contract(vaultAddress, Vault__factory.abi);
    };

    const toVaultParamCall = (contract: Contract) => contract.vaultParams();
    const tototalBalanceCalls = (contract: Contract) => contract.totalBalance();

    const vaultsInput: MulticallInput<VaultInfo> = {
      inputInfos: _.map(vaultDefs, (def) => ({
        address: def!.address,
        id: def!.id,
        nspace,
      })),
      contractMapper: toContract,
      callMappers: [toVaultParamCall, tototalBalanceCalls],
      resultsMapper: () => (results) => {
        const [vaultParams, totalBalance] = results;
        const [, decimals, asset, cap] = vaultParams;
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
    const toVaultContract = (address: string) => {
      return new Contract(address, Vault__factory.abi);
    };

    const vaultAddressToBalanceCalls = (contract: Contract) =>
      contract.deposits(userAddress);

    const vaultsInput: MulticallInput<VaultSignInInfo> = {
      inputInfos: _.map(vaultDefs, (def) => ({
        address: def!.address,
        id: def!.id,
        nspace: "vaults",
        decimals: vaultInfos[def!.address]?.decimals,
      })),
      contractMapper: toVaultContract,
      callMappers: [vaultAddressToBalanceCalls],
      resultsMapper: (info) => (results) => {
        const [deposit] = results;
        const { decimals } = info;
        return {
          balance: parseFloat(formatUnits(deposit, decimals)),
        };
      },
    };

    const toTokenContract = (address: string) => {
      return new Contract(address, erc20Abi);
    };

    const toTokenBalanceCalls = (contract: Contract) =>
      contract.balanceOf(userAddress);
    const toTokenNameCalls = (contract: Contract) => contract.name();
    const toTokenSymbolCalls = (contract: Contract) => contract.symbol();
    const toTokenDecimalsCalls = (contract: Contract) => contract.decimals();

    const tokensInput: MulticallInput<TokenSignInInfo & TokenInfo> = {
      inputInfos: _.map(tokens, (address) => ({
        address,
        nspace: "tokens",
      })),
      contractMapper: toTokenContract,
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
