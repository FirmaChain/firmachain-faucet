/* eslint-disable */
import * as Long from "long";
import { util, configure, Writer, Reader } from "protobufjs/minimal";
import { NftItem } from "../nft/nft_item";

export const protobufPackage = "firmachain.firmachain.nft";

/** GenesisState defines the nft module's genesis state. */
export interface GenesisState {
  nftItemList: NftItem[];
  nftItemCount: number;
}

const baseGenesisState: object = { nftItemCount: 0 };

export const GenesisState = {
  encode(message: GenesisState, writer: Writer = Writer.create()): Writer {
    for (const v of message.nftItemList) {
      NftItem.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.nftItemCount !== 0) {
      writer.uint32(16).uint64(message.nftItemCount);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGenesisState } as GenesisState;
    message.nftItemList = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.nftItemList.push(NftItem.decode(reader, reader.uint32()));
          break;
        case 2:
          message.nftItemCount = longToNumber(reader.uint64() as Long);
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
    message.nftItemList = [];
    if (object.nftItemList !== undefined && object.nftItemList !== null) {
      for (const e of object.nftItemList) {
        message.nftItemList.push(NftItem.fromJSON(e));
      }
    }
    if (object.nftItemCount !== undefined && object.nftItemCount !== null) {
      message.nftItemCount = Number(object.nftItemCount);
    } else {
      message.nftItemCount = 0;
    }
    return message;
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    if (message.nftItemList) {
      obj.nftItemList = message.nftItemList.map((e) =>
        e ? NftItem.toJSON(e) : undefined
      );
    } else {
      obj.nftItemList = [];
    }
    message.nftItemCount !== undefined &&
      (obj.nftItemCount = message.nftItemCount);
    return obj;
  },

  fromPartial(object: DeepPartial<GenesisState>): GenesisState {
    const message = { ...baseGenesisState } as GenesisState;
    message.nftItemList = [];
    if (object.nftItemList !== undefined && object.nftItemList !== null) {
      for (const e of object.nftItemList) {
        message.nftItemList.push(NftItem.fromPartial(e));
      }
    }
    if (object.nftItemCount !== undefined && object.nftItemCount !== null) {
      message.nftItemCount = object.nftItemCount;
    } else {
      message.nftItemCount = 0;
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
