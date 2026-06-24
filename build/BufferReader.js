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
    assertReadable(byteLength) {
        if (!Number.isSafeInteger(byteLength) || byteLength < 0 || this.offset + byteLength > this.byteLength) {
            throw new Error(`Cannot read ${byteLength} bytes from binary payload at offset ${this.offset}.`);
        }
    }
    readArrayLength(bytesPerElement) {
        const length = this.readUInt32();
        const byteLength = length * bytesPerElement;
        if (!Number.isSafeInteger(byteLength)) {
            throw new Error(`Cannot read binary array with length ${length}.`);
        }
        this.assertReadable(byteLength);
        return length;
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
        this.assertReadable(length);
        const value = this.buffer.toString('utf8', this.offset, this.offset + length);
        this.offset += length;
        return value;
    }
    readUInt8Array() {
        const length = this.readArrayLength(1);
        const arr = new Uint8Array(length);
        for (let i = 0; i < length; i++) {
            arr[i] = this.readUInt8();
        }
        return arr;
    }
    readInt8Array() {
        const length = this.readArrayLength(1);
        const arr = new Int8Array(length);
        for (let i = 0; i < length; i++) {
            arr[i] = this.readInt8();
        }
        return arr;
    }
    readUInt16Array() {
        const length = this.readArrayLength(2);
        const arr = new Uint16Array(length);
        for (let i = 0; i < length; i++) {
            arr[i] = this.readUInt16();
        }
        return arr;
    }
    readInt16Array() {
        const length = this.readArrayLength(2);
        const arr = new Int16Array(length);
        for (let i = 0; i < length; i++) {
            arr[i] = this.readInt16();
        }
        return arr;
    }
    readUInt32Array() {
        const length = this.readArrayLength(4);
        const arr = new Uint32Array(length);
        for (let i = 0; i < length; i++) {
            arr[i] = this.readUInt32();
        }
        return arr;
    }
    readInt32Array() {
        const length = this.readArrayLength(4);
        const arr = new Int32Array(length);
        for (let i = 0; i < length; i++) {
            arr[i] = this.readInt32();
        }
        return arr;
    }
    readFloat32Array() {
        const length = this.readArrayLength(4);
        const arr = new Float32Array(length);
        for (let i = 0; i < length; i++) {
            arr[i] = this.readFloat32();
        }
        return arr;
    }
    readFloat64Array() {
        const length = this.readArrayLength(8);
        const arr = new Float64Array(length);
        for (let i = 0; i < length; i++) {
            arr[i] = this.readFloat64();
        }
        return arr;
    }
}
exports.BufferReader = BufferReader;
