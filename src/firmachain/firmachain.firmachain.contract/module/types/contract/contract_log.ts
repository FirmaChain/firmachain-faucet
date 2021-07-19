/* eslint-disable */
import * as Long from "long";
import { util, configure, Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "firmachain.firmachain.contract";

export interface ContractLog {
  creator: string;
  id: number;
  contractHash: string;
  timeStamp: number;
  eventName: string;
  ownerAddress: string;
  jsonString: string;
}

const baseContractLog: object = {
  creator: "",
  id: 0,
  contractHash: "",
  timeStamp: 0,
  eventName: "",
  ownerAddress: "",
  jsonString: "",
};

export const ContractLog = {
  encode(message: ContractLog, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint64(message.id);
    }
    if (message.contractHash !== "") {
      writer.uint32(26).string(message.contractHash);
    }
    if (message.timeStamp !== 0) {
      writer.uint32(32).uint64(message.timeStamp);
    }
    if (message.eventName !== "") {
      writer.uint32(42).string(message.eventName);
    }
    if (message.ownerAddress !== "") {
      writer.uint32(50).string(message.ownerAddress);
    }
    if (message.jsonString !== "") {
      writer.uint32(58).string(message.jsonString);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ContractLog {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseContractLog } as ContractLog;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.contractHash = reader.string();
          break;
        case 4:
          message.timeStamp = longToNumber(reader.uint64() as Long);
          break;
        case 5:
          message.eventName = reader.string();
          break;
        case 6:
          message.ownerAddress = reader.string();
          break;
        case 7:
          message.jsonString = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ContractLog {
    const message = { ...baseContractLog } as ContractLog;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
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

  toJSON(message: ContractLog): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    message.contractHash !== undefined &&
      (obj.contractHash = message.contractHash);
    message.timeStamp !== undefined && (obj.timeStamp = message.timeStamp);
    message.eventName !== undefined && (obj.eventName = message.eventName);
    message.ownerAddress !== undefined &&
      (obj.ownerAddress = message.ownerAddress);
    message.jsonString !== undefined && (obj.jsonString = message.jsonString);
    return obj;
  },

  fromPartial(object: DeepPartial<ContractLog>): ContractLog {
    const message = { ...baseContractLog } as ContractLog;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
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
