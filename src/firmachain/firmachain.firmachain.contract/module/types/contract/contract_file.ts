/* eslint-disable */
import * as Long from "long";
import { util, configure, Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "firmachain.firmachain.contract";

export interface ContractFile {
  creator: string;
  fileHash: string;
  timeStamp: number;
  ownerList: string[];
  metaDataJsonString: string;
}

const baseContractFile: object = {
  creator: "",
  fileHash: "",
  timeStamp: 0,
  ownerList: "",
  metaDataJsonString: "",
};

export const ContractFile = {
  encode(message: ContractFile, writer: Writer = Writer.create()): Writer {
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

  decode(input: Reader | Uint8Array, length?: number): ContractFile {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseContractFile } as ContractFile;
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

  fromJSON(object: any): ContractFile {
    const message = { ...baseContractFile } as ContractFile;
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

  toJSON(message: ContractFile): unknown {
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

  fromPartial(object: DeepPartial<ContractFile>): ContractFile {
    const message = { ...baseContractFile } as ContractFile;
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
