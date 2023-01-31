"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BufferReader_1 = require("./BufferReader");
test('constructs from buffer', () => {
    const buf = Buffer.alloc(1);
    const br = new BufferReader_1.BufferReader(buf, 0);
    expect(br.buffer).toBe(buf);
});
test('constructs from buffer at an offset', () => {
    const buf = Buffer.alloc(2);
    // write a number at the second byte
    buf.writeUInt8(16, 0);
    buf.writeUInt8(32, 1);
    // construct at an offset
    const br = new BufferReader_1.BufferReader(buf, 1);
    // expect value to be the second byte
    expect(br.readUInt8()).toBe(32);
});
test('readUInt8', () => {
    const value = 123;
    const buf = Buffer.alloc(1);
    buf.writeUInt8(value);
    const br = new BufferReader_1.BufferReader(buf, 0);
    expect(br.readUInt8()).toBe(value);
    expect(br.offset).toBe(1);
});
test('readInt8', () => {
    const value = 123;
    const buf = Buffer.alloc(1);
    buf.writeInt8(value);
    const br = new BufferReader_1.BufferReader(buf, 0);
    expect(br.readInt8()).toBe(value);
    expect(br.offset).toBe(1);
});
test('readUInt16', () => {
    const value = 12345;
    const buf = Buffer.alloc(2);
    buf.writeUInt16BE(value);
    const br = new BufferReader_1.BufferReader(buf, 0);
    expect(br.readUInt16()).toBe(value);
    expect(br.offset).toBe(2);
});
test('readInt16', () => {
    const value = 12345;
    const buf = Buffer.alloc(2);
    buf.writeInt16BE(value);
    const br = new BufferReader_1.BufferReader(buf, 0);
    expect(br.readInt16()).toBe(value);
    expect(br.offset).toBe(2);
});
test('readUInt32', () => {
    const value = 123456789;
    const buf = Buffer.alloc(4);
    buf.writeUInt32BE(value);
    const br = new BufferReader_1.BufferReader(buf, 0);
    expect(br.readUInt32()).toBe(value);
    expect(br.offset).toBe(4);
});
test('readInt32', () => {
    const value = 123456789;
    const buf = Buffer.alloc(4);
    buf.writeInt32BE(value);
    const br = new BufferReader_1.BufferReader(buf, 0);
    expect(br.readInt32()).toBe(value);
    expect(br.offset).toBe(4);
});
test('readFloat32', () => {
    const value = 1.23456789; // this is past 32 bits btw
    const buf = Buffer.alloc(4);
    buf.writeFloatBE(value);
    const br = new BufferReader_1.BufferReader(buf, 0);
    expect(br.readFloat32()).toBeCloseTo(value); // checks to 2 decimal places
    expect(br.offset).toBe(4);
});
test('readFloat64', () => {
    const value = 1.23456789;
    const buf = Buffer.alloc(8);
    buf.writeDoubleBE(value);
    const br = new BufferReader_1.BufferReader(buf, 0);
    expect(br.readFloat64()).toBeCloseTo(value); // checks to 2 decimal places
    expect(br.offset).toBe(8);
});
