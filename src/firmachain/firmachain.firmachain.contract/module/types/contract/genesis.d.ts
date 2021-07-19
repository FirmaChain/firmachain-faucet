import { Writer, Reader } from "protobufjs/minimal";
import { ContractFile } from "../contract/contract_file";
import { ContractLog } from "../contract/contract_log";
export declare const protobufPackage = "firmachain.firmachain.contract";
/** GenesisState defines the contract module's genesis state. */
export interface GenesisState {
    contractFileList: ContractFile[];
    contractLogList: ContractLog[];
    contractLogCount: number;
}
export declare const GenesisState: {
    encode(message: GenesisState, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): GenesisState;
    fromJSON(object: any): GenesisState;
    toJSON(message: GenesisState): unknown;
    fromPartial(object: DeepPartial<GenesisState>): GenesisState;
};
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
