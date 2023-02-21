"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BufferWriter = void 0;
const buffer_1 = require("buffer");
class BufferWriter {
    constructor(buffer, offset) {
        this.buffer = buffer;
        this.offset = offset || 0;
    }
    static create(byteLength) {
        return new BufferWriter(buffer_1.Buffer.allocUnsafe(byteLength));
    }
    writeUInt8(value) {
        this.buffer.writeUInt8(value, this.offset);
        this.offset += 1;
    }
    writeInt8(value) {
        this.buffer.writeInt8(value, this.offset);
        this.offset += 1;
    }
    writeUInt16(value) {
        this.buffer.writeUInt16BE(value, this.offset);
        this.offset += 2;
    }
    writeInt16(value) {
        this.buffer.writeInt16BE(value, this.offset);
        this.offset += 2;
    }
    writeUInt32(value) {
        this.buffer.writeUInt32BE(value, this.offset);
        this.offset += 4;
    }
    writeInt32(value) {
        this.buffer.writeInt32BE(value, this.offset);
        this.offset += 4;
    }
    writeFloat32(value) {
        this.buffer.writeFloatBE(value, this.offset);
        this.offset += 4;
    }
    writeFloat64(value) {
        this.buffer.writeDoubleBE(value, this.offset);
        this.offset += 8;
    }
    writeString(value) {
        const length = buffer_1.Buffer.byteLength(value, 'utf8');
        this.writeUInt32(length);
        this.buffer.write(value, this.offset, 'utf8');
        this.offset += length;
    }
    writeUInt8Array(value) {
        const length = value.byteLength;
        this.writeUInt32(length);
        for (let i = 0; i < value.length; i++) {
            this.writeUInt8(value[i]);
        }
    }
    writeInt8Array(value) {
        const length = value.length;
        this.writeUInt32(length);
        for (let i = 0; i < value.length; i++) {
            this.writeInt8(value[i]);
        }
    }
    writeUInt16Array(value) {
        const length = value.length;
        this.writeUInt32(length);
        for (let i = 0; i < value.length; i++) {
            this.writeUInt16(value[i]);
        }
    }
    writeInt16Array(value) {
        const length = value.length;
        this.writeUInt32(length);
        for (let i = 0; i < value.length; i++) {
            this.writeInt16(value[i]);
        }
    }
    writeUInt32Array(value) {
        const length = value.length;
        this.writeUInt32(length);
        for (let i = 0; i < value.length; i++) {
            this.writeUInt32(value[i]);
        }
    }
    writeInt32Array(value) {
        const length = value.length;
        this.writeUInt32(length);
        for (let i = 0; i < value.length; i++) {
            this.writeInt32(value[i]);
        }
    }
    writeFloat32Array(value) {
        const length = value.length;
        this.writeUInt32(length);
        for (let i = 0; i < value.length; i++) {
            this.writeFloat32(value[i]);
        }
    }
    writeFloat64Array(value) {
        const length = value.length;
        this.writeUInt32(length);
        for (let i = 0; i < value.length; i++) {
            this.writeFloat64(value[i]);
        }
    }
}
exports.BufferWriter = BufferWriter;
