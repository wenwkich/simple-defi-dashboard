import _ from "lodash";

export const ASSET_PRICE_DEFAULT: {
  [key: string]: { id: string; price: number };
} = {
  BTC: {
    id: "WBTC",
    price: 40000,
  },
  ETH: {
    id: "ETH",
    price: 3000,
  },
  AVAX: {
    id: "AVAX",
    price: 60,
  },
  USDC: {
    id: "USDC",
    price: 1,
  },
};
