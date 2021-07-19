import { Reader, Writer } from "protobufjs/minimal";
import { ContractFile } from "../contract/contract_file";
import { PageRequest, PageResponse } from "../cosmos/base/query/v1beta1/pagination";
import { ContractLog } from "../contract/contract_log";
export declare const protobufPackage = "firmachain.firmachain.contract";
export interface QueryIsContractOwnerRequest {
    fileHash: string;
    ownerAddress: string;
}
export interface QueryIsContractOwnerResponse {
    result: boolean;
}
export interface QueryGetContractFileRequest {
    index: string;
}
export interface QueryGetContractFileResponse {
    ContractFile: ContractFile | undefined;
}
export interface QueryAllContractFileRequest {
    pagination: PageRequest | undefined;
}
export interface QueryAllContractFileResponse {
    ContractFile: ContractFile[];
    pagination: PageResponse | undefined;
}
export interface QueryGetContractLogRequest {
    id: number;
}
export interface QueryGetContractLogResponse {
    ContractLog: ContractLog | undefined;
}
export interface QueryAllContractLogRequest {
    pagination: PageRequest | undefined;
}
export interface QueryAllContractLogResponse {
    ContractLog: ContractLog[];
    pagination: PageResponse | undefined;
}
export declare const QueryIsContractOwnerRequest: {
    encode(message: QueryIsContractOwnerRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryIsContractOwnerRequest;
    fromJSON(object: any): QueryIsContractOwnerRequest;
    toJSON(message: QueryIsContractOwnerRequest): unknown;
    fromPartial(object: DeepPartial<QueryIsContractOwnerRequest>): QueryIsContractOwnerRequest;
};
export declare const QueryIsContractOwnerResponse: {
    encode(message: QueryIsContractOwnerResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryIsContractOwnerResponse;
    fromJSON(object: any): QueryIsContractOwnerResponse;
    toJSON(message: QueryIsContractOwnerResponse): unknown;
    fromPartial(object: DeepPartial<QueryIsContractOwnerResponse>): QueryIsContractOwnerResponse;
};
export declare const QueryGetContractFileRequest: {
    encode(message: QueryGetContractFileRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetContractFileRequest;
    fromJSON(object: any): QueryGetContractFileRequest;
    toJSON(message: QueryGetContractFileRequest): unknown;
    fromPartial(object: DeepPartial<QueryGetContractFileRequest>): QueryGetContractFileRequest;
};
export declare const QueryGetContractFileResponse: {
    encode(message: QueryGetContractFileResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetContractFileResponse;
    fromJSON(object: any): QueryGetContractFileResponse;
    toJSON(message: QueryGetContractFileResponse): unknown;
    fromPartial(object: DeepPartial<QueryGetContractFileResponse>): QueryGetContractFileResponse;
};
export declare const QueryAllContractFileRequest: {
    encode(message: QueryAllContractFileRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllContractFileRequest;
    fromJSON(object: any): QueryAllContractFileRequest;
    toJSON(message: QueryAllContractFileRequest): unknown;
    fromPartial(object: DeepPartial<QueryAllContractFileRequest>): QueryAllContractFileRequest;
};
export declare const QueryAllContractFileResponse: {
    encode(message: QueryAllContractFileResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllContractFileResponse;
    fromJSON(object: any): QueryAllContractFileResponse;
    toJSON(message: QueryAllContractFileResponse): unknown;
    fromPartial(object: DeepPartial<QueryAllContractFileResponse>): QueryAllContractFileResponse;
};
export declare const QueryGetContractLogRequest: {
    encode(message: QueryGetContractLogRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetContractLogRequest;
    fromJSON(object: any): QueryGetContractLogRequest;
    toJSON(message: QueryGetContractLogRequest): unknown;
    fromPartial(object: DeepPartial<QueryGetContractLogRequest>): QueryGetContractLogRequest;
};
export declare const QueryGetContractLogResponse: {
    encode(message: QueryGetContractLogResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetContractLogResponse;
    fromJSON(object: any): QueryGetContractLogResponse;
    toJSON(message: QueryGetContractLogResponse): unknown;
    fromPartial(object: DeepPartial<QueryGetContractLogResponse>): QueryGetContractLogResponse;
};
export declare const QueryAllContractLogRequest: {
    encode(message: QueryAllContractLogRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllContractLogRequest;
    fromJSON(object: any): QueryAllContractLogRequest;
    toJSON(message: QueryAllContractLogRequest): unknown;
    fromPartial(object: DeepPartial<QueryAllContractLogRequest>): QueryAllContractLogRequest;
};
export declare const QueryAllContractLogResponse: {
    encode(message: QueryAllContractLogResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllContractLogResponse;
    fromJSON(object: any): QueryAllContractLogResponse;
    toJSON(message: QueryAllContractLogResponse): unknown;
    fromPartial(object: DeepPartial<QueryAllContractLogResponse>): QueryAllContractLogResponse;
};
/** Query defines the gRPC querier service. */
export interface Query {
    /** Queries a list of isContractOwner items. */
    IsContractOwner(request: QueryIsContractOwnerRequest): Promise<QueryIsContractOwnerResponse>;
    /** Queries a contractFile by index. */
    ContractFile(request: QueryGetContractFileRequest): Promise<QueryGetContractFileResponse>;
    /** Queries a list of contractFile items. */
    ContractFileAll(request: QueryAllContractFileRequest): Promise<QueryAllContractFileResponse>;
    /** Queries a contractLog by id. */
    ContractLog(request: QueryGetContractLogRequest): Promise<QueryGetContractLogResponse>;
    /** Queries a list of contractLog items. */
    ContractLogAll(request: QueryAllContractLogRequest): Promise<QueryAllContractLogResponse>;
}
export declare class QueryClientImpl implements Query {
    private readonly rpc;
    constructor(rpc: Rpc);
    IsContractOwner(request: QueryIsContractOwnerRequest): Promise<QueryIsContractOwnerResponse>;
    ContractFile(request: QueryGetContractFileRequest): Promise<QueryGetContractFileResponse>;
    ContractFileAll(request: QueryAllContractFileRequest): Promise<QueryAllContractFileResponse>;
    ContractLog(request: QueryGetContractLogRequest): Promise<QueryGetContractLogResponse>;
    ContractLogAll(request: QueryAllContractLogRequest): Promise<QueryAllContractLogResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
