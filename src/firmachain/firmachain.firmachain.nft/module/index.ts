// THIS FILE IS GENERATED AUTOMATICALLY. DO NOT MODIFY.

import { StdFee } from "@cosmjs/launchpad";
import { SigningStargateClient } from "@cosmjs/stargate";
import { Registry, OfflineSigner, EncodeObject, DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { Api } from "./rest";
import { MsgTransfer } from "./types/nft/tx";
import { MsgMint } from "./types/nft/tx";
import { MsgBurn } from "./types/nft/tx";


const types = [
  ["/firmachain.firmachain.nft.MsgTransfer", MsgTransfer],
  ["/firmachain.firmachain.nft.MsgMint", MsgMint],
  ["/firmachain.firmachain.nft.MsgBurn", MsgBurn],
  
];
export const MissingWalletError = new Error("wallet is required");

const registry = new Registry(<any>types);

const defaultFee = {
  amount: [],
  gas: "200000",
};

interface TxClientOptions {
  addr: string
}

interface SignAndBroadcastOptions {
  fee: StdFee,
  memo?: string
}

const txClient = async (wallet: OfflineSigner, { addr: addr }: TxClientOptions = { addr: "http://localhost:26657" }) => {
  if (!wallet) throw MissingWalletError;

  const client = await SigningStargateClient.connectWithSigner(addr, wallet, { registry });
  const { address } = (await wallet.getAccounts())[0];

  return {
    signAndBroadcast: (msgs: EncodeObject[], { fee, memo }: SignAndBroadcastOptions = {fee: defaultFee, memo: ""}) => client.signAndBroadcast(address, msgs, fee,memo),
    msgTransfer: (data: MsgTransfer): EncodeObject => ({ typeUrl: "/firmachain.firmachain.nft.MsgTransfer", value: data }),
    msgMint: (data: MsgMint): EncodeObject => ({ typeUrl: "/firmachain.firmachain.nft.MsgMint", value: data }),
    msgBurn: (data: MsgBurn): EncodeObject => ({ typeUrl: "/firmachain.firmachain.nft.MsgBurn", value: data }),
    
  };
};

interface QueryClientOptions {
  addr: string
}

const queryClient = async ({ addr: addr }: QueryClientOptions = { addr: "http://localhost:1317" }) => {
  return new Api({ baseUrl: addr });
};

export {
  txClient,
  queryClient,
};
