/* eslint-disable */
import * as Long from "long";
import { util, configure, Writer, Reader } from "protobufjs/minimal";
import { ContractFile } from "../contract/contract_file";
import { ContractLog } from "../contract/contract_log";

export const protobufPackage = "firmachain.firmachain.contract";

/** GenesisState defines the contract module's genesis state. */
export interface GenesisState {
  contractFileList: ContractFile[];
  contractLogList: ContractLog[];
  contractLogCount: number;
}

const baseGenesisState: object = { contractLogCount: 0 };

export const GenesisState = {
  encode(message: GenesisState, writer: Writer = Writer.create()): Writer {
    for (const v of message.contractFileList) {
      ContractFile.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.contractLogList) {
      ContractLog.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.contractLogCount !== 0) {
      writer.uint32(16).uint64(message.contractLogCount);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGenesisState } as GenesisState;
    message.contractFileList = [];
    message.contractLogList = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 3:
          message.contractFileList.push(
            ContractFile.decode(reader, reader.uint32())
          );
          break;
        case 1:
          message.contractLogList.push(
            ContractLog.decode(reader, reader.uint32())
          );
          break;
        case 2:
          message.contractLogCount = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenesisState {
    const message = { ...baseGenesisState } as GenesisState;
    message.contractFileList = [];
    message.contractLogList = [];
    if (
      object.contractFileList !== undefined &&
      object.contractFileList !== null
    ) {
      for (const e of object.contractFileList) {
        message.contractFileList.push(ContractFile.fromJSON(e));
      }
    }
    if (
      object.contractLogList !== undefined &&
      object.contractLogList !== null
    ) {
      for (const e of object.contractLogList) {
        message.contractLogList.push(ContractLog.fromJSON(e));
      }
    }
    if (
      object.contractLogCount !== undefined &&
      object.contractLogCount !== null
    ) {
      message.contractLogCount = Number(object.contractLogCount);
    } else {
      message.contractLogCount = 0;
    }
    return message;
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    if (message.contractFileList) {
      obj.contractFileList = message.contractFileList.map((e) =>
        e ? ContractFile.toJSON(e) : undefined
      );
    } else {
      obj.contractFileList = [];
    }
    if (message.contractLogList) {
      obj.contractLogList = message.contractLogList.map((e) =>
        e ? ContractLog.toJSON(e) : undefined
      );
    } else {
      obj.contractLogList = [];
    }
    message.contractLogCount !== undefined &&
      (obj.contractLogCount = message.contractLogCount);
    return obj;
  },

  fromPartial(object: DeepPartial<GenesisState>): GenesisState {
    const message = { ...baseGenesisState } as GenesisState;
    message.contractFileList = [];
    message.contractLogList = [];
    if (
      object.contractFileList !== undefined &&
      object.contractFileList !== null
    ) {
      for (const e of object.contractFileList) {
        message.contractFileList.push(ContractFile.fromPartial(e));
      }
    }
    if (
      object.contractLogList !== undefined &&
      object.contractLogList !== null
    ) {
      for (const e of object.contractLogList) {
        message.contractLogList.push(ContractLog.fromPartial(e));
      }
    }
    if (
      object.contractLogCount !== undefined &&
      object.contractLogCount !== null
    ) {
      message.contractLogCount = object.contractLogCount;
    } else {
      message.contractLogCount = 0;
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
