/* eslint-disable */
import { Reader, util, configure, Writer } from "protobufjs/minimal";
import * as Long from "long";
import { ContractFile } from "../contract/contract_file";
import {
  PageRequest,
  PageResponse,
} from "../cosmos/base/query/v1beta1/pagination";
import { ContractLog } from "../contract/contract_log";

export const protobufPackage = "firmachain.firmachain.contract";

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

const baseQueryIsContractOwnerRequest: object = {
  fileHash: "",
  ownerAddress: "",
};

export const QueryIsContractOwnerRequest = {
  encode(
    message: QueryIsContractOwnerRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.fileHash !== "") {
      writer.uint32(10).string(message.fileHash);
    }
    if (message.ownerAddress !== "") {
      writer.uint32(18).string(message.ownerAddress);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryIsContractOwnerRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryIsContractOwnerRequest,
    } as QueryIsContractOwnerRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.fileHash = reader.string();
          break;
        case 2:
          message.ownerAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryIsContractOwnerRequest {
    const message = {
      ...baseQueryIsContractOwnerRequest,
    } as QueryIsContractOwnerRequest;
    if (object.fileHash !== undefined && object.fileHash !== null) {
      message.fileHash = String(object.fileHash);
    } else {
      message.fileHash = "";
    }
    if (object.ownerAddress !== undefined && object.ownerAddress !== null) {
      message.ownerAddress = String(object.ownerAddress);
    } else {
      message.ownerAddress = "";
    }
    return message;
  },

  toJSON(message: QueryIsContractOwnerRequest): unknown {
    const obj: any = {};
    message.fileHash !== undefined && (obj.fileHash = message.fileHash);
    message.ownerAddress !== undefined &&
      (obj.ownerAddress = message.ownerAddress);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryIsContractOwnerRequest>
  ): QueryIsContractOwnerRequest {
    const message = {
      ...baseQueryIsContractOwnerRequest,
    } as QueryIsContractOwnerRequest;
    if (object.fileHash !== undefined && object.fileHash !== null) {
      message.fileHash = object.fileHash;
    } else {
      message.fileHash = "";
    }
    if (object.ownerAddress !== undefined && object.ownerAddress !== null) {
      message.ownerAddress = object.ownerAddress;
    } else {
      message.ownerAddress = "";
    }
    return message;
  },
};

const baseQueryIsContractOwnerResponse: object = { result: false };

export const QueryIsContractOwnerResponse = {
  encode(
    message: QueryIsContractOwnerResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.result === true) {
      writer.uint32(8).bool(message.result);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryIsContractOwnerResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryIsContractOwnerResponse,
    } as QueryIsContractOwnerResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.result = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryIsContractOwnerResponse {
    const message = {
      ...baseQueryIsContractOwnerResponse,
    } as QueryIsContractOwnerResponse;
    if (object.result !== undefined && object.result !== null) {
      message.result = Boolean(object.result);
    } else {
      message.result = false;
    }
    return message;
  },

  toJSON(message: QueryIsContractOwnerResponse): unknown {
    const obj: any = {};
    message.result !== undefined && (obj.result = message.result);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryIsContractOwnerResponse>
  ): QueryIsContractOwnerResponse {
    const message = {
      ...baseQueryIsContractOwnerResponse,
    } as QueryIsContractOwnerResponse;
    if (object.result !== undefined && object.result !== null) {
      message.result = object.result;
    } else {
      message.result = false;
    }
    return message;
  },
};

const baseQueryGetContractFileRequest: object = { index: "" };

export const QueryGetContractFileRequest = {
  encode(
    message: QueryGetContractFileRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.index !== "") {
      writer.uint32(10).string(message.index);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryGetContractFileRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetContractFileRequest,
    } as QueryGetContractFileRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.index = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetContractFileRequest {
    const message = {
      ...baseQueryGetContractFileRequest,
    } as QueryGetContractFileRequest;
    if (object.index !== undefined && object.index !== null) {
      message.index = String(object.index);
    } else {
      message.index = "";
    }
    return message;
  },

  toJSON(message: QueryGetContractFileRequest): unknown {
    const obj: any = {};
    message.index !== undefined && (obj.index = message.index);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetContractFileRequest>
  ): QueryGetContractFileRequest {
    const message = {
      ...baseQueryGetContractFileRequest,
    } as QueryGetContractFileRequest;
    if (object.index !== undefined && object.index !== null) {
      message.index = object.index;
    } else {
      message.index = "";
    }
    return message;
  },
};

const baseQueryGetContractFileResponse: object = {};

export const QueryGetContractFileResponse = {
  encode(
    message: QueryGetContractFileResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.ContractFile !== undefined) {
      ContractFile.encode(
        message.ContractFile,
        writer.uint32(10).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryGetContractFileResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetContractFileResponse,
    } as QueryGetContractFileResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ContractFile = ContractFile.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetContractFileResponse {
    const message = {
      ...baseQueryGetContractFileResponse,
    } as QueryGetContractFileResponse;
    if (object.ContractFile !== undefined && object.ContractFile !== null) {
      message.ContractFile = ContractFile.fromJSON(object.ContractFile);
    } else {
      message.ContractFile = undefined;
    }
    return message;
  },

  toJSON(message: QueryGetContractFileResponse): unknown {
    const obj: any = {};
    message.ContractFile !== undefined &&
      (obj.ContractFile = message.ContractFile
        ? ContractFile.toJSON(message.ContractFile)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetContractFileResponse>
  ): QueryGetContractFileResponse {
    const message = {
      ...baseQueryGetContractFileResponse,
    } as QueryGetContractFileResponse;
    if (object.ContractFile !== undefined && object.ContractFile !== null) {
      message.ContractFile = ContractFile.fromPartial(object.ContractFile);
    } else {
      message.ContractFile = undefined;
    }
    return message;
  },
};

const baseQueryAllContractFileRequest: object = {};

export const QueryAllContractFileRequest = {
  encode(
    message: QueryAllContractFileRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryAllContractFileRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryAllContractFileRequest,
    } as QueryAllContractFileRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllContractFileRequest {
    const message = {
      ...baseQueryAllContractFileRequest,
    } as QueryAllContractFileRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllContractFileRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllContractFileRequest>
  ): QueryAllContractFileRequest {
    const message = {
      ...baseQueryAllContractFileRequest,
    } as QueryAllContractFileRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryAllContractFileResponse: object = {};

export const QueryAllContractFileResponse = {
  encode(
    message: QueryAllContractFileResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.ContractFile) {
      ContractFile.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryAllContractFileResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryAllContractFileResponse,
    } as QueryAllContractFileResponse;
    message.ContractFile = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ContractFile.push(
            ContractFile.decode(reader, reader.uint32())
          );
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllContractFileResponse {
    const message = {
      ...baseQueryAllContractFileResponse,
    } as QueryAllContractFileResponse;
    message.ContractFile = [];
    if (object.ContractFile !== undefined && object.ContractFile !== null) {
      for (const e of object.ContractFile) {
        message.ContractFile.push(ContractFile.fromJSON(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllContractFileResponse): unknown {
    const obj: any = {};
    if (message.ContractFile) {
      obj.ContractFile = message.ContractFile.map((e) =>
        e ? ContractFile.toJSON(e) : undefined
      );
    } else {
      obj.ContractFile = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllContractFileResponse>
  ): QueryAllContractFileResponse {
    const message = {
      ...baseQueryAllContractFileResponse,
    } as QueryAllContractFileResponse;
    message.ContractFile = [];
    if (object.ContractFile !== undefined && object.ContractFile !== null) {
      for (const e of object.ContractFile) {
        message.ContractFile.push(ContractFile.fromPartial(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryGetContractLogRequest: object = { id: 0 };

export const QueryGetContractLogRequest = {
  encode(
    message: QueryGetContractLogRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryGetContractLogRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetContractLogRequest,
    } as QueryGetContractLogRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetContractLogRequest {
    const message = {
      ...baseQueryGetContractLogRequest,
    } as QueryGetContractLogRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    return message;
  },

  toJSON(message: QueryGetContractLogRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetContractLogRequest>
  ): QueryGetContractLogRequest {
    const message = {
      ...baseQueryGetContractLogRequest,
    } as QueryGetContractLogRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    return message;
  },
};

const baseQueryGetContractLogResponse: object = {};

export const QueryGetContractLogResponse = {
  encode(
    message: QueryGetContractLogResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.ContractLog !== undefined) {
      ContractLog.encode(
        message.ContractLog,
        writer.uint32(10).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryGetContractLogResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetContractLogResponse,
    } as QueryGetContractLogResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ContractLog = ContractLog.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetContractLogResponse {
    const message = {
      ...baseQueryGetContractLogResponse,
    } as QueryGetContractLogResponse;
    if (object.ContractLog !== undefined && object.ContractLog !== null) {
      message.ContractLog = ContractLog.fromJSON(object.ContractLog);
    } else {
      message.ContractLog = undefined;
    }
    return message;
  },

  toJSON(message: QueryGetContractLogResponse): unknown {
    const obj: any = {};
    message.ContractLog !== undefined &&
      (obj.ContractLog = message.ContractLog
        ? ContractLog.toJSON(message.ContractLog)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetContractLogResponse>
  ): QueryGetContractLogResponse {
    const message = {
      ...baseQueryGetContractLogResponse,
    } as QueryGetContractLogResponse;
    if (object.ContractLog !== undefined && object.ContractLog !== null) {
      message.ContractLog = ContractLog.fromPartial(object.ContractLog);
    } else {
      message.ContractLog = undefined;
    }
    return message;
  },
};

const baseQueryAllContractLogRequest: object = {};

export const QueryAllContractLogRequest = {
  encode(
    message: QueryAllContractLogRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryAllContractLogRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryAllContractLogRequest,
    } as QueryAllContractLogRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllContractLogRequest {
    const message = {
      ...baseQueryAllContractLogRequest,
    } as QueryAllContractLogRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllContractLogRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllContractLogRequest>
  ): QueryAllContractLogRequest {
    const message = {
      ...baseQueryAllContractLogRequest,
    } as QueryAllContractLogRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryAllContractLogResponse: object = {};

export const QueryAllContractLogResponse = {
  encode(
    message: QueryAllContractLogResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.ContractLog) {
      ContractLog.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryAllContractLogResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryAllContractLogResponse,
    } as QueryAllContractLogResponse;
    message.ContractLog = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ContractLog.push(ContractLog.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllContractLogResponse {
    const message = {
      ...baseQueryAllContractLogResponse,
    } as QueryAllContractLogResponse;
    message.ContractLog = [];
    if (object.ContractLog !== undefined && object.ContractLog !== null) {
      for (const e of object.ContractLog) {
        message.ContractLog.push(ContractLog.fromJSON(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllContractLogResponse): unknown {
    const obj: any = {};
    if (message.ContractLog) {
      obj.ContractLog = message.ContractLog.map((e) =>
        e ? ContractLog.toJSON(e) : undefined
      );
    } else {
      obj.ContractLog = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllContractLogResponse>
  ): QueryAllContractLogResponse {
    const message = {
      ...baseQueryAllContractLogResponse,
    } as QueryAllContractLogResponse;
    message.ContractLog = [];
    if (object.ContractLog !== undefined && object.ContractLog !== null) {
      for (const e of object.ContractLog) {
        message.ContractLog.push(ContractLog.fromPartial(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  /** Queries a list of isContractOwner items. */
  IsContractOwner(
    request: QueryIsContractOwnerRequest
  ): Promise<QueryIsContractOwnerResponse>;
  /** Queries a contractFile by index. */
  ContractFile(
    request: QueryGetContractFileRequest
  ): Promise<QueryGetContractFileResponse>;
  /** Queries a list of contractFile items. */
  ContractFileAll(
    request: QueryAllContractFileRequest
  ): Promise<QueryAllContractFileResponse>;
  /** Queries a contractLog by id. */
  ContractLog(
    request: QueryGetContractLogRequest
  ): Promise<QueryGetContractLogResponse>;
  /** Queries a list of contractLog items. */
  ContractLogAll(
    request: QueryAllContractLogRequest
  ): Promise<QueryAllContractLogResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  IsContractOwner(
    request: QueryIsContractOwnerRequest
  ): Promise<QueryIsContractOwnerResponse> {
    const data = QueryIsContractOwnerRequest.encode(request).finish();
    const promise = this.rpc.request(
      "firmachain.firmachain.contract.Query",
      "IsContractOwner",
      data
    );
    return promise.then((data) =>
      QueryIsContractOwnerResponse.decode(new Reader(data))
    );
  }

  ContractFile(
    request: QueryGetContractFileRequest
  ): Promise<QueryGetContractFileResponse> {
    const data = QueryGetContractFileRequest.encode(request).finish();
    const promise = this.rpc.request(
      "firmachain.firmachain.contract.Query",
      "ContractFile",
      data
    );
    return promise.then((data) =>
      QueryGetContractFileResponse.decode(new Reader(data))
    );
  }

  ContractFileAll(
    request: QueryAllContractFileRequest
  ): Promise<QueryAllContractFileResponse> {
    const data = QueryAllContractFileRequest.encode(request).finish();
    const promise = this.rpc.request(
      "firmachain.firmachain.contract.Query",
      "ContractFileAll",
      data
    );
    return promise.then((data) =>
      QueryAllContractFileResponse.decode(new Reader(data))
    );
  }

  ContractLog(
    request: QueryGetContractLogRequest
  ): Promise<QueryGetContractLogResponse> {
    const data = QueryGetContractLogRequest.encode(request).finish();
    const promise = this.rpc.request(
      "firmachain.firmachain.contract.Query",
      "ContractLog",
      data
    );
    return promise.then((data) =>
      QueryGetContractLogResponse.decode(new Reader(data))
    );
  }

  ContractLogAll(
    request: QueryAllContractLogRequest
  ): Promise<QueryAllContractLogResponse> {
    const data = QueryAllContractLogRequest.encode(request).finish();
    const promise = this.rpc.request(
      "firmachain.firmachain.contract.Query",
      "ContractLogAll",
      data
    );
    return promise.then((data) =>
      QueryAllContractLogResponse.decode(new Reader(data))
    );
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array
  ): Promise<Uint8Array>;
}

declare var self: any | undefined;
declare var window: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

type Builtin = Date | Function | Uint8Array | string | number | undefined;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

// if (util.Long !== Long) {
//   util.Long = Long as any;
//   configure();
// }
