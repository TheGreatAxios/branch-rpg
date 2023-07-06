![](https://i.imgur.com/1zN8P56.png)

# Getting started

BranchRPG was an example app to showcase smart account features for a web3 game. It was built on the [ERC-4337 standard](https://github.com/eth-infinitism/account-abstraction/blob/develop/eip/EIPS/eip-4337.md) along with several open source tools:

- Game engine: [RPG JS](https://rpgjs.dev/)
- Contract accounts: [zerodevapp/kernel](https://github.com/zerodevapp/kernel)
- JS SDK: [userop.js](https://github.com/stackup-wallet/userop.js)

It not has a massively simplified codebase with an invisible blockchain experience using SKALE instead of account abstraction. Wallet creation and gas distribution all happen automatically behind the scenese on the client.

## Game play

By design, this demo is extremely simple. The game state and every action is handled through an [ERC-20 smart contract on SKALE Chaos Testnet](https://staging-fast-active-bellatrix.explorer.staging-v3.skalenodes.com/address/0xCD1cb5032F4C854cbc4646214eD9ab3BbDe37062/transactions). The use of Proof of Work behind the scenes with sFUEL - the token powering zero gas fees on SKALE - means that the blockchain components of this game are 100% invisible.

The aim of the game is simply to:

1. Fetch some water (an ERC-20 mint transaction)
2. Water the garden patch (an ERC-20 burn transaction)
3. Watch the global score increase as more people do the same thing.

**The global score is a state stored on the contract. Which mean the business logic for this game is entirely decentralized.**

## Running an instance

Since the state of the game world is entirely on-chain, you can fork this repo, run a local instance, and make the client your own while still accessing the same score as the Stackup hosted version.

To run a local version:

```bash
# RPG JS v3 is only compatible on Node v14.
nvm use 14 && npm install && npm run dev
```

# License

Distributed under the MIT License. See [LICENSE](./LICENSE) for more information.

# Contact

Any technical questions on this can be voiced to either any of the following locations:

- [SKALE Developer Discord](https://discord.gg/skale)
- [Dirt Road Development Discord](https://discord.dirtroad.dev]
