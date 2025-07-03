# FirmaChain Testnet/Devnet Faucet

![image](https://user-images.githubusercontent.com/5277080/132805004-9716fcec-1502-4a1a-817e-6de3c50f046d.png)

Website : https://faucet-testnet.firmachain.dev/

FirmaChain Faucet is a web service to obtain coins in testnet and devnet environments.

The coin provided should be used only for testing purposes. Also, we are not responsible for issues related to testnet/devnet coin.

> ⚠️ <b>WARNING</b>: The coin obtained through faucet is not compatible with the coin of mainnet and has no value.

## Stack

- Node v20
- React 18 + Typescript
- Material Design
- Zustand

## Structure

```
.
├── public/
├── src/
│   ├── components/
│   ├── context/
│   ├── screen/
│   ├── store/
│   └── ...
├── .env.example
├── package.json
└── ...
```

## Getting Started

### Installation

```bash
git clone git@github.com:FirmaChain/firmachain-faucet.git
cd firmachain-faucet

nvm use # If using nvm.
# If not, set the proper version within .nvmrc
yarn install
```

### Environment Variables

| Environment File | Description        |
| ---------------- | ------------------ |
| `.env.dev`       | Default / Dev mode |
| `.env.testnet`   | Testnet            |

### Running the Development Server

| Script    | Environment File | Description         |
| --------- | ---------------- | ------------------- |
| `dev`     | `.env.dev`       | Default             |
| `testnet` | `.env.testnet`   | Testnet environment |

### Available Scripts

| Script                | Description                                |
| --------------------- | ------------------------------------------ |
| `yarn run dev`        | Run development server                     |
| `yarn run testnet`    | Run development server with testnet config |
| `yarn run build`      | Build static file with testnet config      |
| `yarn run deploy`     | Deploy built static file to S3             |
| `yarn run invalidate` | Invalidate current deployed static file    |
| `yarn run format`     | Run prettier formatter                     |

## Misc

### How to generate proper FAUCET_MNEMONIC and RECAPTCHA_SITEKEY

> ⚠️ <b style="color:red">"NEVER"</b> use mnemonic that contains any valuable asset.
>
> When you deploy this service on outer web, only use test keys that are safe to be exposed.
>
> Following obfuscated method is <b>NOT</b> a security method, but merely a basic obfuscation to prevent direct exposure of the key in the source.

- You can obfuscate keys with the function named `obfuscateKey` stored in `/src/utils/common.ts`.

### Why development servers don't check for recapture when requesting tokens

- In development mode, checking recaptcha is disabled for testing convenience.
- The 'dev state' is determined by if the page is on dev server, or static build.
- You can find related code at `activateSendProcess` function in `/src/screen/main.tsx`
