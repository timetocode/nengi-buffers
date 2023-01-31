/// <reference types="node" />
import { IBinaryWriter } from 'nengi';
import { Buffer } from 'buffer';
declare class BufferWriter implements IBinaryWriter {
    buffer: Buffer;
    offset: number;
    constructor(buffer: Buffer, offset?: number);
    static create(byteLength: number): BufferWriter;
    writeUInt8(value: number): void;
    writeInt8(value: number): void;
    writeUInt16(value: number): void;
    writeInt16(value: number): void;
    writeUInt32(value: number): void;
    writeInt32(value: number): void;
    writeFloat32(value: number): void;
    writeFloat64(value: number): void;
    writeString(value: string): void;
    writeUInt8Array(value: Uint8Array): void;
}
export { BufferWriter };
