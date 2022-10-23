import { Switch } from "@chakra-ui/react";
import React from "react";
import { ConnectWallet } from "../common/ConnectWallet";
import SwitchChain from "../common/SwitchChain";
import Nav from "./Nav";

export default function NavWithWallet() {
  return (
    <Nav>
      <div className="flex flex-row gap-2"></div>
      <SwitchChain />
      <ConnectWallet />
    </Nav>
  );
}
