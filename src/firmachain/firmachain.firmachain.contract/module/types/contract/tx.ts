/* eslint-disable */
import { Reader, util, configure, Writer } from "protobufjs/minimal";
import * as Long from "long";

export const protobufPackage = "firmachain.firmachain.contract";

export interface MsgCreateContractFile {
  creator: string;
  fileHash: string;
  timeStamp: number;
  ownerList: string[];
  metaDataJsonString: string;
}

export interface MsgCreateContractFileResponse {}

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

const baseMsgCreateContractFile: object = {
  creator: "",
  fileHash: "",
  timeStamp: 0,
  ownerList: "",
  metaDataJsonString: "",
};

export const MsgCreateContractFile = {
  encode(
    message: MsgCreateContractFile,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.fileHash !== "") {
      writer.uint32(18).string(message.fileHash);
    }
    if (message.timeStamp !== 0) {
      writer.uint32(24).uint64(message.timeStamp);
    }
    for (const v of message.ownerList) {
      writer.uint32(34).string(v!);
    }
    if (message.metaDataJsonString !== "") {
      writer.uint32(42).string(message.metaDataJsonString);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgCreateContractFile {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgCreateContractFile } as MsgCreateContractFile;
    message.ownerList = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.fileHash = reader.string();
          break;
        case 3:
          message.timeStamp = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.ownerList.push(reader.string());
          break;
        case 5:
          message.metaDataJsonString = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateContractFile {
    const message = { ...baseMsgCreateContractFile } as MsgCreateContractFile;
    message.ownerList = [];
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.fileHash !== undefined && object.fileHash !== null) {
      message.fileHash = String(object.fileHash);
    } else {
      message.fileHash = "";
    }
    if (object.timeStamp !== undefined && object.timeStamp !== null) {
      message.timeStamp = Number(object.timeStamp);
    } else {
      message.timeStamp = 0;
    }
    if (object.ownerList !== undefined && object.ownerList !== null) {
      for (const e of object.ownerList) {
        message.ownerList.push(String(e));
      }
    }
    if (
      object.metaDataJsonString !== undefined &&
      object.metaDataJsonString !== null
    ) {
      message.metaDataJsonString = String(object.metaDataJsonString);
    } else {
      message.metaDataJsonString = "";
    }
    return message;
  },

  toJSON(message: MsgCreateContractFile): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.fileHash !== undefined && (obj.fileHash = message.fileHash);
    message.timeStamp !== undefined && (obj.timeStamp = message.timeStamp);
    if (message.ownerList) {
      obj.ownerList = message.ownerList.map((e) => e);
    } else {
      obj.ownerList = [];
    }
    message.metaDataJsonString !== undefined &&
      (obj.metaDataJsonString = message.metaDataJsonString);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgCreateContractFile>
  ): MsgCreateContractFile {
    const message = { ...baseMsgCreateContractFile } as MsgCreateContractFile;
    message.ownerList = [];
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.fileHash !== undefined && object.fileHash !== null) {
      message.fileHash = object.fileHash;
    } else {
      message.fileHash = "";
    }
    if (object.timeStamp !== undefined && object.timeStamp !== null) {
      message.timeStamp = object.timeStamp;
    } else {
      message.timeStamp = 0;
    }
    if (object.ownerList !== undefined && object.ownerList !== null) {
      for (const e of object.ownerList) {
        message.ownerList.push(e);
      }
    }
    if (
      object.metaDataJsonString !== undefined &&
      object.metaDataJsonString !== null
    ) {
      message.metaDataJsonString = object.metaDataJsonString;
    } else {
      message.metaDataJsonString = "";
    }
    return message;
  },
};

const baseMsgCreateContractFileResponse: object = {};

export const MsgCreateContractFileResponse = {
  encode(
    _: MsgCreateContractFileResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgCreateContractFileResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgCreateContractFileResponse,
    } as MsgCreateContractFileResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgCreateContractFileResponse {
    const message = {
      ...baseMsgCreateContractFileResponse,
    } as MsgCreateContractFileResponse;
    return message;
  },

  toJSON(_: MsgCreateContractFileResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgCreateContractFileResponse>
  ): MsgCreateContractFileResponse {
    const message = {
      ...baseMsgCreateContractFileResponse,
    } as MsgCreateContractFileResponse;
    return message;
  },
};

const baseMsgAddContractLog: object = {
  creator: "",
  contractHash: "",
  timeStamp: 0,
  eventName: "",
  ownerAddress: "",
  jsonString: "",
};

export const MsgAddContractLog = {
  encode(message: MsgAddContractLog, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.contractHash !== "") {
      writer.uint32(18).string(message.contractHash);
    }
    if (message.timeStamp !== 0) {
      writer.uint32(24).uint64(message.timeStamp);
    }
    if (message.eventName !== "") {
      writer.uint32(34).string(message.eventName);
    }
    if (message.ownerAddress !== "") {
      writer.uint32(42).string(message.ownerAddress);
    }
    if (message.jsonString !== "") {
      writer.uint32(50).string(message.jsonString);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgAddContractLog {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgAddContractLog } as MsgAddContractLog;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.contractHash = reader.string();
          break;
        case 3:
          message.timeStamp = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.eventName = reader.string();
          break;
        case 5:
          message.ownerAddress = reader.string();
          break;
        case 6:
          message.jsonString = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgAddContractLog {
    const message = { ...baseMsgAddContractLog } as MsgAddContractLog;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.contractHash !== undefined && object.contractHash !== null) {
      message.contractHash = String(object.contractHash);
    } else {
      message.contractHash = "";
    }
    if (object.timeStamp !== undefined && object.timeStamp !== null) {
      message.timeStamp = Number(object.timeStamp);
    } else {
      message.timeStamp = 0;
    }
    if (object.eventName !== undefined && object.eventName !== null) {
      message.eventName = String(object.eventName);
    } else {
      message.eventName = "";
    }
    if (object.ownerAddress !== undefined && object.ownerAddress !== null) {
      message.ownerAddress = String(object.ownerAddress);
    } else {
      message.ownerAddress = "";
    }
    if (object.jsonString !== undefined && object.jsonString !== null) {
      message.jsonString = String(object.jsonString);
    } else {
      message.jsonString = "";
    }
    return message;
  },

  toJSON(message: MsgAddContractLog): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.contractHash !== undefined &&
      (obj.contractHash = message.contractHash);
    message.timeStamp !== undefined && (obj.timeStamp = message.timeStamp);
    message.eventName !== undefined && (obj.eventName = message.eventName);
    message.ownerAddress !== undefined &&
      (obj.ownerAddress = message.ownerAddress);
    message.jsonString !== undefined && (obj.jsonString = message.jsonString);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgAddContractLog>): MsgAddContractLog {
    const message = { ...baseMsgAddContractLog } as MsgAddContractLog;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.contractHash !== undefined && object.contractHash !== null) {
      message.contractHash = object.contractHash;
    } else {
      message.contractHash = "";
    }
    if (object.timeStamp !== undefined && object.timeStamp !== null) {
      message.timeStamp = object.timeStamp;
    } else {
      message.timeStamp = 0;
    }
    if (object.eventName !== undefined && object.eventName !== null) {
      message.eventName = object.eventName;
    } else {
      message.eventName = "";
    }
    if (object.ownerAddress !== undefined && object.ownerAddress !== null) {
      message.ownerAddress = object.ownerAddress;
    } else {
      message.ownerAddress = "";
    }
    if (object.jsonString !== undefined && object.jsonString !== null) {
      message.jsonString = object.jsonString;
    } else {
      message.jsonString = "";
    }
    return message;
  },
};

const baseMsgAddContractLogResponse: object = { id: 0 };

export const MsgAddContractLogResponse = {
  encode(
    message: MsgAddContractLogResponse,
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
  ): MsgAddContractLogResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgAddContractLogResponse,
    } as MsgAddContractLogResponse;
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

  fromJSON(object: any): MsgAddContractLogResponse {
    const message = {
      ...baseMsgAddContractLogResponse,
    } as MsgAddContractLogResponse;
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    return message;
  },

  toJSON(message: MsgAddContractLogResponse): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgAddContractLogResponse>
  ): MsgAddContractLogResponse {
    const message = {
      ...baseMsgAddContractLogResponse,
    } as MsgAddContractLogResponse;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  CreateContractFile(
    request: MsgCreateContractFile
  ): Promise<MsgCreateContractFileResponse>;
  AddContractLog(
    request: MsgAddContractLog
  ): Promise<MsgAddContractLogResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  CreateContractFile(
    request: MsgCreateContractFile
  ): Promise<MsgCreateContractFileResponse> {
    const data = MsgCreateContractFile.encode(request).finish();
    const promise = this.rpc.request(
      "firmachain.firmachain.contract.Msg",
      "CreateContractFile",
      data
    );
    return promise.then((data) =>
      MsgCreateContractFileResponse.decode(new Reader(data))
    );
  }

  AddContractLog(
    request: MsgAddContractLog
  ): Promise<MsgAddContractLogResponse> {
    const data = MsgAddContractLog.encode(request).finish();
    const promise = this.rpc.request(
      "firmachain.firmachain.contract.Msg",
      "AddContractLog",
      data
    );
    return promise.then((data) =>
      MsgAddContractLogResponse.decode(new Reader(data))
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

/*
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}*/
