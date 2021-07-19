import { Reader, Writer } from "protobufjs/minimal";
import { NftItem } from "../nft/nft_item";
import { PageRequest, PageResponse } from "../cosmos/base/query/v1beta1/pagination";
export declare const protobufPackage = "firmachain.firmachain.nft";
export interface QueryTokenOfOwnerByIndexRequest {
    ownerAddress: string;
    index: number;
}
export interface QueryTokenOfOwnerByIndexResponse {
    tokenId: number;
}
export interface QueryBalanceOfRequest {
    ownerAddress: string;
}
export interface QueryBalanceOfResponse {
    total: number;
}
export interface QueryGetNftItemRequest {
    id: number;
}
export interface QueryGetNftItemResponse {
    NftItem: NftItem | undefined;
}
export interface QueryAllNftItemRequest {
    pagination: PageRequest | undefined;
}
export interface QueryAllNftItemResponse {
    NftItem: NftItem[];
    pagination: PageResponse | undefined;
}
export declare const QueryTokenOfOwnerByIndexRequest: {
    encode(message: QueryTokenOfOwnerByIndexRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryTokenOfOwnerByIndexRequest;
    fromJSON(object: any): QueryTokenOfOwnerByIndexRequest;
    toJSON(message: QueryTokenOfOwnerByIndexRequest): unknown;
    fromPartial(object: DeepPartial<QueryTokenOfOwnerByIndexRequest>): QueryTokenOfOwnerByIndexRequest;
};
export declare const QueryTokenOfOwnerByIndexResponse: {
    encode(message: QueryTokenOfOwnerByIndexResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryTokenOfOwnerByIndexResponse;
    fromJSON(object: any): QueryTokenOfOwnerByIndexResponse;
    toJSON(message: QueryTokenOfOwnerByIndexResponse): unknown;
    fromPartial(object: DeepPartial<QueryTokenOfOwnerByIndexResponse>): QueryTokenOfOwnerByIndexResponse;
};
export declare const QueryBalanceOfRequest: {
    encode(message: QueryBalanceOfRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryBalanceOfRequest;
    fromJSON(object: any): QueryBalanceOfRequest;
    toJSON(message: QueryBalanceOfRequest): unknown;
    fromPartial(object: DeepPartial<QueryBalanceOfRequest>): QueryBalanceOfRequest;
};
export declare const QueryBalanceOfResponse: {
    encode(message: QueryBalanceOfResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryBalanceOfResponse;
    fromJSON(object: any): QueryBalanceOfResponse;
    toJSON(message: QueryBalanceOfResponse): unknown;
    fromPartial(object: DeepPartial<QueryBalanceOfResponse>): QueryBalanceOfResponse;
};
export declare const QueryGetNftItemRequest: {
    encode(message: QueryGetNftItemRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetNftItemRequest;
    fromJSON(object: any): QueryGetNftItemRequest;
    toJSON(message: QueryGetNftItemRequest): unknown;
    fromPartial(object: DeepPartial<QueryGetNftItemRequest>): QueryGetNftItemRequest;
};
export declare const QueryGetNftItemResponse: {
    encode(message: QueryGetNftItemResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetNftItemResponse;
    fromJSON(object: any): QueryGetNftItemResponse;
    toJSON(message: QueryGetNftItemResponse): unknown;
    fromPartial(object: DeepPartial<QueryGetNftItemResponse>): QueryGetNftItemResponse;
};
export declare const QueryAllNftItemRequest: {
    encode(message: QueryAllNftItemRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllNftItemRequest;
    fromJSON(object: any): QueryAllNftItemRequest;
    toJSON(message: QueryAllNftItemRequest): unknown;
    fromPartial(object: DeepPartial<QueryAllNftItemRequest>): QueryAllNftItemRequest;
};
export declare const QueryAllNftItemResponse: {
    encode(message: QueryAllNftItemResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllNftItemResponse;
    fromJSON(object: any): QueryAllNftItemResponse;
    toJSON(message: QueryAllNftItemResponse): unknown;
    fromPartial(object: DeepPartial<QueryAllNftItemResponse>): QueryAllNftItemResponse;
};
/** Query defines the gRPC querier service. */
export interface Query {
    /** Queries a list of tokenOfOwnerByIndex items. */
    TokenOfOwnerByIndex(request: QueryTokenOfOwnerByIndexRequest): Promise<QueryTokenOfOwnerByIndexResponse>;
    /** Queries a list of balanceOf items. */
    BalanceOf(request: QueryBalanceOfRequest): Promise<QueryBalanceOfResponse>;
    /** Queries a nftItem by id. */
    NftItem(request: QueryGetNftItemRequest): Promise<QueryGetNftItemResponse>;
    /** Queries a list of nftItem items. */
    NftItemAll(request: QueryAllNftItemRequest): Promise<QueryAllNftItemResponse>;
}
export declare class QueryClientImpl implements Query {
    private readonly rpc;
    constructor(rpc: Rpc);
    TokenOfOwnerByIndex(request: QueryTokenOfOwnerByIndexRequest): Promise<QueryTokenOfOwnerByIndexResponse>;
    BalanceOf(request: QueryBalanceOfRequest): Promise<QueryBalanceOfResponse>;
    NftItem(request: QueryGetNftItemRequest): Promise<QueryGetNftItemResponse>;
    NftItemAll(request: QueryAllNftItemRequest): Promise<QueryAllNftItemResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
