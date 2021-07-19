import { Reader, Writer } from "protobufjs/minimal";
export declare const protobufPackage = "firmachain.firmachain.contract";
export interface MsgCreateContractFile {
    creator: string;
    fileHash: string;
    timeStamp: number;
    ownerList: string[];
    metaDataJsonString: string;
}
export interface MsgCreateContractFileResponse {
}
export interface MsgAddContractLog {
    creator: string;
    contractHash: string;
    timeStamp: number;
    eventName: string;
    ownerAddress: string;
    jsonString: string;
}
export interface MsgAddContractLogResponse {
    id: number;
}
export declare const MsgCreateContractFile: {
    encode(message: MsgCreateContractFile, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgCreateContractFile;
    fromJSON(object: any): MsgCreateContractFile;
    toJSON(message: MsgCreateContractFile): unknown;
    fromPartial(object: DeepPartial<MsgCreateContractFile>): MsgCreateContractFile;
};
export declare const MsgCreateContractFileResponse: {
    encode(_: MsgCreateContractFileResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgCreateContractFileResponse;
    fromJSON(_: any): MsgCreateContractFileResponse;
    toJSON(_: MsgCreateContractFileResponse): unknown;
    fromPartial(_: DeepPartial<MsgCreateContractFileResponse>): MsgCreateContractFileResponse;
};
export declare const MsgAddContractLog: {
    encode(message: MsgAddContractLog, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgAddContractLog;
    fromJSON(object: any): MsgAddContractLog;
    toJSON(message: MsgAddContractLog): unknown;
    fromPartial(object: DeepPartial<MsgAddContractLog>): MsgAddContractLog;
};
export declare const MsgAddContractLogResponse: {
    encode(message: MsgAddContractLogResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgAddContractLogResponse;
    fromJSON(object: any): MsgAddContractLogResponse;
    toJSON(message: MsgAddContractLogResponse): unknown;
    fromPartial(object: DeepPartial<MsgAddContractLogResponse>): MsgAddContractLogResponse;
};
/** Msg defines the Msg service. */
export interface Msg {
    CreateContractFile(request: MsgCreateContractFile): Promise<MsgCreateContractFileResponse>;
    AddContractLog(request: MsgAddContractLog): Promise<MsgAddContractLogResponse>;
}
export declare class MsgClientImpl implements Msg {
    private readonly rpc;
    constructor(rpc: Rpc);
    CreateContractFile(request: MsgCreateContractFile): Promise<MsgCreateContractFileResponse>;
    AddContractLog(request: MsgAddContractLog): Promise<MsgAddContractLogResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
