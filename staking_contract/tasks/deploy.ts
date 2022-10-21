import { task } from "hardhat/config";

import WETH9 from "../external-artifacts/WETH9.json";
import { ProxyAdmin__factory, TokenX__factory, Vault__factory } from "../types";

task("deploy:v1", "Deploy vault contracts", async (_, { getNamedAccounts, deployments, ethers }) => {
  const { deployer } = await getNamedAccounts();
  const { deploy } = deployments;

  const WETH = await deploy("WETH9", {
    from: deployer,
    contract: WETH9,
    gasLimit: 4000000,
    args: [],
    log: true,
  });

  const AVAX = await deploy("AVAX", {
    from: deployer,
    contract: TokenX__factory,
    gasLimit: 4000000,
    args: ["AVAX", "AVAX"],
    log: true,
  });

  const WBTC = await deploy("WBTC", {
    from: deployer,
    contract: TokenX__factory,
    gasLimit: 4000000,
    args: ["WBTC", "WBTC"],
    log: true,
  });

  const proxyAdminRes = await deploy("ProxyAdmin", {
    from: deployer,
    contract: ProxyAdmin__factory,
    gasLimit: 4000000,
    args: [],
    log: true,
  });

  const WETH_VAULT = await deploy("Vault", {
    from: deployer,
    contract: Vault__factory,
    gasLimit: 4000000,
    args: [],
    log: true,
    proxy: {
      owner: deployer,
      proxyContract: "OpenZeppelinTransparentProxy",
      viaAdminContract: "ProxyAdmin",
      execute: {
        methodName: "initialize",
        args: [
          "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
          {
            vaultType: 0,
            decimals: 18,
            asset: WETH.address,
            cap: ethers.utils.parseEther("" + 1000),
          },
        ],
      },
    },
  });

  const AVAX_VAULT = await deploy("Vault", {
    from: deployer,
    contract: Vault__factory,
    gasLimit: 4000000,
    args: [],
    log: true,
    proxy: {
      owner: deployer,
      proxyContract: "OpenZeppelinTransparentProxy",
      viaAdminContract: "ProxyAdmin",
      execute: {
        methodName: "initialize",
        args: [
          "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
          {
            vaultType: 0,
            decimals: 18,
            asset: AVAX.address,
            cap: ethers.utils.parseEther("" + 1000),
          },
        ],
      },
    },
  });

  const WBTC_VAULT = await deploy("Vault", {
    from: deployer,
    contract: Vault__factory,
    gasLimit: 4000000,
    args: [],
    log: true,
    proxy: {
      owner: deployer,
      proxyContract: "OpenZeppelinTransparentProxy",
      viaAdminContract: "ProxyAdmin",
      execute: {
        methodName: "initialize",
        args: [
          "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
          {
            vaultType: 0,
            decimals: 18,
            asset: WBTC.address,
            cap: ethers.utils.parseEther("" + 1000),
          },
        ],
      },
    },
  });
});

export {};
