import { BufferReader } from './BufferReader'

test('constructs from buffer', () => {
    const buf = Buffer.alloc(1)
    const br = new BufferReader(buf, 0)
    expect(br.buffer).toBe(buf)
})

test('constructs from buffer at an offset', () => {
    const buf = Buffer.alloc(2)
    // write a number at the second byte
    buf.writeUInt8(16, 0)
    buf.writeUInt8(32, 1)

    // construct at an offset
    const br = new BufferReader(buf, 1)
    // expect value to be the second byte
    expect(br.readUInt8()).toBe(32)
})

test('readUInt8', () => {
    const value = 123
    const buf = Buffer.alloc(1)
    buf.writeUInt8(value)
    const br = new BufferReader(buf, 0)
    expect(br.readUInt8()).toBe(value)
    expect(br.offset).toBe(1)
})

test('readInt8', () => {
    const value = 123
    const buf = Buffer.alloc(1)
    buf.writeInt8(value)
    const br = new BufferReader(buf, 0)
    expect(br.readInt8()).toBe(value)
    expect(br.offset).toBe(1)
})

test('readUInt16', () => {
    const value = 12345
    const buf = Buffer.alloc(2)
    buf.writeUInt16BE(value)
    const br = new BufferReader(buf, 0)
    expect(br.readUInt16()).toBe(value)
    expect(br.offset).toBe(2)
})

test('readInt16', () => {
    const value = 12345
    const buf = Buffer.alloc(2)
    buf.writeInt16BE(value)
    const br = new BufferReader(buf, 0)
    expect(br.readInt16()).toBe(value)
    expect(br.offset).toBe(2)
})

test('readUInt32', () => {
    const value = 123456789
    const buf = Buffer.alloc(4)
    buf.writeUInt32BE(value)
    const br = new BufferReader(buf, 0)
    expect(br.readUInt32()).toBe(value)
    expect(br.offset).toBe(4)
})

test('readInt32', () => {
    const value = 123456789
    const buf = Buffer.alloc(4)
    buf.writeInt32BE(value)
    const br = new BufferReader(buf, 0)
    expect(br.readInt32()).toBe(value)
    expect(br.offset).toBe(4)
})

test('readFloat32', () => {
    const value = 1.23456789 // this is past 32 bits btw
    const buf = Buffer.alloc(4)
    buf.writeFloatBE(value)
    const br = new BufferReader(buf, 0)
    expect(br.readFloat32()).toBeCloseTo(value) // checks to 2 decimal places
    expect(br.offset).toBe(4)
})

test('readFloat64', () => {
    const value = 1.23456789
    const buf = Buffer.alloc(8)
    buf.writeDoubleBE(value)
    const br = new BufferReader(buf, 0)
    expect(br.readFloat64()).toBeCloseTo(value) // checks to 2 decimal places
    expect(br.offset).toBe(8)
})

test('readUInt8Array', () => {
    const value = new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
    const buf = Buffer.alloc(14)

    let offset = 0
    buf.writeUint32BE(value.length, offset)
    offset += 4
    value.forEach(byte => {
        buf.writeUint8(byte, offset)
        offset += 1
    })

    const br = new BufferReader(buf, 0)
    expect(br.readUInt8Array()).toEqual(value)
})

test('readInt8Array', () => {
    const value = new Int8Array([0, 1, 2, 3, -4, -5, 6, 7, 8, 9])
    const buf = Buffer.alloc(14)

    let offset = 0
    buf.writeUint32BE(value.length, offset)
    offset += 4
    value.forEach(byte => {
        buf.writeInt8(byte, offset)
        offset += 1
    })

    const br = new BufferReader(buf, 0)
    expect(br.readInt8Array()).toEqual(value)
})

test('readUInt16Array', () => {
    const value = new Uint16Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 65535])
    const buf = Buffer.alloc(24)

    let offset = 0
    buf.writeUint32BE(value.length, offset)
    offset += 4
    value.forEach(byte => {
        buf.writeUint16BE(byte, offset)
        offset += 2
    })

    const br = new BufferReader(buf, 0)
    expect(br.readUInt16Array()).toEqual(value)
})

test('readInt16Array', () => {
    const value = new Int16Array([0, 1, 2, 3, -4, -5, 6, 7, 8, 32767])
    const buf = Buffer.alloc(24)

    let offset = 0
    buf.writeUint32BE(value.length, offset)
    offset += 4
    value.forEach(byte => {
        buf.writeInt16BE(byte, offset)
        offset += 2
    })

    const br = new BufferReader(buf, 0)
    expect(br.readInt16Array()).toEqual(value)
})

test('readUInt32Array', () => {
    const value = new Uint32Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 12365535])
    const buf = Buffer.alloc(44)

    let offset = 0
    buf.writeUint32BE(value.length, offset)
    offset += 4
    value.forEach(byte => {
        buf.writeUint32BE(byte, offset)
        offset += 4
    })

    const br = new BufferReader(buf, 0)
    expect(br.readUInt32Array()).toEqual(value)
})

test('readInt32Array', () => {
    const value = new Int32Array([0, 1, 2, 3, -4, -5, 6, 7, 8, 12332767])
    const buf = Buffer.alloc(44)

    let offset = 0
    buf.writeUint32BE(value.length, offset)
    offset += 4
    value.forEach(byte => {
        buf.writeInt32BE(byte, offset)
        offset += 4
    })

    const br = new BufferReader(buf, 0)
    expect(br.readInt32Array()).toEqual(value)
})

test('readFloat32Array', () => {
    const value = new Float32Array([0, 1.123, 2, 3, -4.123, -5, 6, 7, 8, 12332.767])
    const buf = Buffer.alloc(44)

    let offset = 0
    buf.writeUint32BE(value.length, offset)
    offset += 4
    value.forEach(byte => {
        buf.writeFloatBE(byte, offset)
        offset += 4
    })

    const br = new BufferReader(buf, 0)
    expect(br.readFloat32Array()).toEqual(value)
})

test('readFloat64Array', () => {
    const value = new Float64Array([0, 1.123, 2, 3, -4.123, -5, 6, 7, 8, 12332.767])
    const buf = Buffer.alloc(84)

    let offset = 0
    buf.writeUint32BE(value.length, offset)
    offset += 4
    value.forEach(byte => {
        buf.writeDoubleBE(byte, offset)
        offset += 8
    })

    const br = new BufferReader(buf, 0)
    expect(br.readFloat64Array()).toEqual(value)
})
