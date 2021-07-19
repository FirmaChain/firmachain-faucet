import { Writer, Reader } from "protobufjs/minimal";
export declare const protobufPackage = "firmachain.firmachain.nft";
export interface NftItem {
    owner: string;
    id: number;
    tokenURI: string;
}
export declare const NftItem: {
    encode(message: NftItem, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): NftItem;
    fromJSON(object: any): NftItem;
    toJSON(message: NftItem): unknown;
    fromPartial(object: DeepPartial<NftItem>): NftItem;
};
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
