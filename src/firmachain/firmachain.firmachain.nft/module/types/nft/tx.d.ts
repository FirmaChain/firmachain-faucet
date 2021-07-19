import { Reader, Writer } from "protobufjs/minimal";
export declare const protobufPackage = "firmachain.firmachain.nft";
export interface MsgTransfer {
    owner: string;
    nftId: number;
    toAddress: string;
}
export interface MsgTransferResponse {
}
export interface MsgBurn {
    owner: string;
    nftId: number;
}
export interface MsgBurnResponse {
    result: boolean;
}
export interface MsgMint {
    owner: string;
    tokenURI: string;
}
export interface MsgMintResponse {
    nftId: number;
}
export declare const MsgTransfer: {
    encode(message: MsgTransfer, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgTransfer;
    fromJSON(object: any): MsgTransfer;
    toJSON(message: MsgTransfer): unknown;
    fromPartial(object: DeepPartial<MsgTransfer>): MsgTransfer;
};
export declare const MsgTransferResponse: {
    encode(_: MsgTransferResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgTransferResponse;
    fromJSON(_: any): MsgTransferResponse;
    toJSON(_: MsgTransferResponse): unknown;
    fromPartial(_: DeepPartial<MsgTransferResponse>): MsgTransferResponse;
};
export declare const MsgBurn: {
    encode(message: MsgBurn, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgBurn;
    fromJSON(object: any): MsgBurn;
    toJSON(message: MsgBurn): unknown;
    fromPartial(object: DeepPartial<MsgBurn>): MsgBurn;
};
export declare const MsgBurnResponse: {
    encode(message: MsgBurnResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgBurnResponse;
    fromJSON(object: any): MsgBurnResponse;
    toJSON(message: MsgBurnResponse): unknown;
    fromPartial(object: DeepPartial<MsgBurnResponse>): MsgBurnResponse;
};
export declare const MsgMint: {
    encode(message: MsgMint, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgMint;
    fromJSON(object: any): MsgMint;
    toJSON(message: MsgMint): unknown;
    fromPartial(object: DeepPartial<MsgMint>): MsgMint;
};
export declare const MsgMintResponse: {
    encode(message: MsgMintResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgMintResponse;
    fromJSON(object: any): MsgMintResponse;
    toJSON(message: MsgMintResponse): unknown;
    fromPartial(object: DeepPartial<MsgMintResponse>): MsgMintResponse;
};
/** Msg defines the Msg service. */
export interface Msg {
    Transfer(request: MsgTransfer): Promise<MsgTransferResponse>;
    Burn(request: MsgBurn): Promise<MsgBurnResponse>;
    Mint(request: MsgMint): Promise<MsgMintResponse>;
}
export declare class MsgClientImpl implements Msg {
    private readonly rpc;
    constructor(rpc: Rpc);
    Transfer(request: MsgTransfer): Promise<MsgTransferResponse>;
    Burn(request: MsgBurn): Promise<MsgBurnResponse>;
    Mint(request: MsgMint): Promise<MsgMintResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
