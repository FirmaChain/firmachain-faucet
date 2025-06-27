# FirmaChain Testnet/Devnet Faucet

![image](https://user-images.githubusercontent.com/5277080/132805004-9716fcec-1502-4a1a-817e-6de3c50f046d.png)

Website : https://faucet-testnet.firmachain.dev/

FirmaChain Faucet is a web service to obtain coins in testnet and devnet environments.

The coin provided should be used only for testing purposes. Also, we are not responsible for issues related to testnet/devnet coin.

**WARNING**: The coin obtained through faucet is not compatible with the coin of mainnet and has no value.

## Environment

- Node v20
- React 18 + Typescript
- Material Design
- Zustand

---

## Initial setup

```bash
nvm use
yarn install
```

---

## Development

### Local Development

```bash
yarn run dev 	    # Uses .env.dev
yarn run testnet 	# Uses .env.testnet
```

### Build

```bash
yarn run build  # Uses .env.testnet
```
