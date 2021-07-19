import { Writer, Reader } from "protobufjs/minimal";
export declare const protobufPackage = "firmachain.firmachain.contract";
export interface ContractLog {
    creator: string;
    id: number;
    contractHash: string;
    timeStamp: number;
    eventName: string;
    ownerAddress: string;
    jsonString: string;
}
export declare const ContractLog: {
    encode(message: ContractLog, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): ContractLog;
    fromJSON(object: any): ContractLog;
    toJSON(message: ContractLog): unknown;
    fromPartial(object: DeepPartial<ContractLog>): ContractLog;
};
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
