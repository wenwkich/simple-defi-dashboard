import {
  Button,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
} from "@chakra-ui/react";
import _ from "lodash";
import { useEthers } from "@usedapp/core";
import {
  getChain,
  getChainNameFromChainId,
  getSupportedChains,
} from "../../utils/constants/chains";

export default function SwitchChain() {
  const { account, switchNetwork, chainId } = useEthers();

  const chains = getSupportedChains();

  const value =
    getChain(getChainNameFromChainId(chainId))?.chainName || "Unknown";

  return (
    <div>
      {account && (
        <Menu>
          <MenuButton
            className="block bg-white border border-gray-200 font-medium rounded-xl text-sm px-5 py-2.5 text-center items-center"
            as={Button}
          >
            <label>{value}</label>
          </MenuButton>

          <MenuList>
            <MenuOptionGroup
              onChange={(value) => switchNetwork(+value)}
              type="radio"
            >
              {_.map(chains, ({ chainId, chainName }) => {
                return (
                  <MenuItemOption key={chainId} value={"" + chainId}>
                    {chainName}
                  </MenuItemOption>
                );
              })}
            </MenuOptionGroup>
          </MenuList>
        </Menu>
      )}
    </div>
  );
}
