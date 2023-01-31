"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BufferReader = void 0;
class BufferReader {
    constructor(buffer, offset) {
        this.buffer = buffer;
        this.offset = offset || 0;
    }
    get byteLength() {
        return this.buffer.byteLength;
    }
    readUInt8() {
        const value = this.buffer.readUInt8(this.offset);
        this.offset += 1;
        return value;
    }
    readInt8() {
        const value = this.buffer.readInt8(this.offset);
        this.offset += 1;
        return value;
    }
    readUInt16() {
        const value = this.buffer.readUInt16BE(this.offset);
        this.offset += 2;
        return value;
    }
    readInt16() {
        const value = this.buffer.readInt16BE(this.offset);
        this.offset += 2;
        return value;
    }
    readUInt32() {
        const value = this.buffer.readUInt32BE(this.offset);
        this.offset += 4;
        return value;
    }
    readInt32() {
        const value = this.buffer.readInt32BE(this.offset);
        this.offset += 4;
        return value;
    }
    readFloat32() {
        const value = this.buffer.readFloatBE(this.offset);
        this.offset += 4;
        return value;
    }
    readFloat64() {
        const value = this.buffer.readDoubleBE(this.offset);
        this.offset += 8;
        return value;
    }
    readString() {
        const length = this.readUInt32();
        const value = this.buffer.toString('utf8', this.offset, this.offset + length);
        this.offset += length;
        return value;
    }
    readUInt8Array() {
        const length = this.readUInt32();
        // console.log({ length })
        const arr = new Uint8Array(length);
        for (let i = 0; i < length; i++) {
            arr[i] = this.readUInt8();
            //console.log(i, arr[i])
        }
        return arr;
    }
}
exports.BufferReader = BufferReader;
