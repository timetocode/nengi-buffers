/// <reference types="node" />
import { IBinaryReader } from 'nengi';
declare class BufferReader implements IBinaryReader {
    buffer: Buffer;
    offset: number;
    constructor(buffer: Buffer, offset?: number);
    get byteLength(): number;
    readUInt8(): number;
    readInt8(): number;
    readUInt16(): number;
    readInt16(): number;
    readUInt32(): number;
    readInt32(): number;
    readFloat32(): number;
    readFloat64(): number;
    readString(): string;
    readUInt8Array(): Uint8Array;
    readInt8Array(): Int8Array;
    readUInt16Array(): Uint16Array;
    readInt16Array(): Int16Array;
    readUInt32Array(): Uint32Array;
    readInt32Array(): Int32Array;
    readFloat32Array(): Float32Array;
    readFloat64Array(): Float64Array;
}
export { BufferReader };
