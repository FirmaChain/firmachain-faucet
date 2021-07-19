import { Writer, Reader } from "protobufjs/minimal";
export declare const protobufPackage = "firmachain.firmachain.contract";
export interface ContractFile {
    creator: string;
    fileHash: string;
    timeStamp: number;
    ownerList: string[];
    metaDataJsonString: string;
}
export declare const ContractFile: {
    encode(message: ContractFile, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): ContractFile;
    fromJSON(object: any): ContractFile;
    toJSON(message: ContractFile): unknown;
    fromPartial(object: DeepPartial<ContractFile>): ContractFile;
};
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
