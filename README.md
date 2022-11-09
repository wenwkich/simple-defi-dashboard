# simple-defi-dashboard
A demo app for querying DeFi Dashboard, with example code of `declarative-multicall` and useDapp hooks example using with `web3modal` and `web3-onboard`

## Demo of declarative-multicall

This dapp has mashed web3 calls into one using [declarative-multicall](https://github.com/wenwkich/declarative-multicall), with the help of [ethcall](https://github.com/Destiner/ethcall)

See [here](src/sdk/ribbon/index.ts)

## useDApp hooks example with connectivity

I really appreciate the ease of use with [useDApp](https://usedapp.io/) to get the ethers provider and etc

And I would like to use it the modern web3 modal libraries

See the use of [web3modal](https://web3modal.com/) [here](src/components/common/activateWeb3Modal.tsx)

And the use of [web3-onboard](https://onboard.blocknative.com/) [here](src/components/common/activateWeb3Onboard.tsx)
