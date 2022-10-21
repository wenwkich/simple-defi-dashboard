import React from "react";

import ETH from "./icons/ETH.svg";
import BTC from "./icons/BTC.svg";
import AVAX from "./icons/AVAX.svg";

export const ICONS: { [key: string]: JSX.Element } = {
  ETH: <ETH />,
  WETH: <ETH />,
  "WETH.e": <ETH />,
  BTC: <BTC />,
  WBTC: <BTC />,
  "WBTC.e": <BTC />,
  AVAX: <AVAX />,
};

export const getIcon = (key: string): JSX.Element => {
  if (ICONS[key]) return ICONS[key];
  return <></>;
};
