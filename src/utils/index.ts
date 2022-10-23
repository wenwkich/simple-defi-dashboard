import { BigNumber, ethers } from "ethers";
import {
  formatEther,
  FormatTypes,
  hexValue,
  Interface,
} from "ethers/lib/utils";
import { Chain } from "@web3-onboard/common";
import { TokenInfoWithBalanceAndIsNative } from "../interfaces";
import { JsonFragment } from "@ethersproject/abi";
import _ from "lodash";

export const address = (entity: any) =>
  entity?.address ? entity.address : ethers.constants.AddressZero;

export const numToString = (input: number) => "" + input;

export const truncateAddress = (address?: string) =>
  address
    ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
    : "Error";

export const hexlify = (input: number) =>
  hexValue(BigNumber.from(input).toHexString());

export const toBN = (input: number) => BigNumber.from(input);
export const bnToNumber = (input: BigNumber) => input.toNumber();

export function nFormatter(num: number, digits: number) {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
    : "0";
}

export function numberWithCommas(x: number) {
  x = roundToTwoDecimals(x);
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function roundToTwoDecimals(x: number) {
  return Math.round((x + Number.EPSILON) * 100) / 100;
}

export const tryToConvertTokenToNative = async (
  chainInfo: Chain | undefined,
  tokenInfo: TokenInfoWithBalanceAndIsNative,
  address: string | undefined,
  provider: ethers.providers.BaseProvider | undefined
) => {
  const nativeTokenName = chainInfo?.token;
  const wrappedTokenName = tokenInfo.symbol;
  const isNative =
    wrappedTokenName === nativeTokenName ||
    wrappedTokenName.substring(1) === nativeTokenName;

  return isNative
    ? {
        ...tokenInfo,
        balance: provider
          ? +formatEther(await provider.getBalance(address || "0x0"))
          : 0,
        symbol: chainInfo?.token,
        native: true,
      }
    : tokenInfo;
};

export const erc20Abi = (() => {
  const erc20StringAbi = [
    "function balanceOf(address owner) view returns (uint)",
  ];
  return new Interface(erc20StringAbi).fragments.map((fragment) =>
    JSON.parse(fragment.format(FormatTypes.json))
  );
})() as JsonFragment[];

export const transformEs6MapToArrays = <K, V>(inputs: Map<K, V>) => {
  return _.map(Array.from(inputs), ([, value]) => value);
};

export const transfromRecordToEs6Map = <K extends string, V>(
  from: Partial<Record<K, V>>
) => {
  return new Map(Object.entries(from)) as Map<K, V>;
};
