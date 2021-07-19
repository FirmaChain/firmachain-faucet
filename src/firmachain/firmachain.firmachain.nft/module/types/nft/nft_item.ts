/* eslint-disable */
import * as Long from "long";
import { util, configure, Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "firmachain.firmachain.nft";

export interface NftItem {
  owner: string;
  id: number;
  tokenURI: string;
}

const baseNftItem: object = { owner: "", id: 0, tokenURI: "" };

export const NftItem = {
  encode(message: NftItem, writer: Writer = Writer.create()): Writer {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint64(message.id);
    }
    if (message.tokenURI !== "") {
      writer.uint32(26).string(message.tokenURI);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): NftItem {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseNftItem } as NftItem;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.owner = reader.string();
          break;
        case 2:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.tokenURI = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): NftItem {
    const message = { ...baseNftItem } as NftItem;
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = String(object.owner);
    } else {
      message.owner = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    if (object.tokenURI !== undefined && object.tokenURI !== null) {
      message.tokenURI = String(object.tokenURI);
    } else {
      message.tokenURI = "";
    }
    return message;
  },

  toJSON(message: NftItem): unknown {
    const obj: any = {};
    message.owner !== undefined && (obj.owner = message.owner);
    message.id !== undefined && (obj.id = message.id);
    message.tokenURI !== undefined && (obj.tokenURI = message.tokenURI);
    return obj;
  },

  fromPartial(object: DeepPartial<NftItem>): NftItem {
    const message = { ...baseNftItem } as NftItem;
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = object.owner;
    } else {
      message.owner = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    if (object.tokenURI !== undefined && object.tokenURI !== null) {
      message.tokenURI = object.tokenURI;
    } else {
      message.tokenURI = "";
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
