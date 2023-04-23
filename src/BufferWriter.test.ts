import { BufferWriter } from './BufferWriter'

test('constructs from buffer', () => {
    const buf = Buffer.alloc(1)
    const br = new BufferWriter(buf, 0)
    expect(br.buffer).toBe(buf)
})

test('constructs from buffer at an offset', () => {
    const value = 123

    // fill with 0
    const buf = Buffer.alloc(2, 0)

    // construct at an offset
    const bw = new BufferWriter(buf, 1)
    // write (to the second byte)
    bw.writeInt8(value)

    // expect first byte to be zero and second byte to be the value we wrote
    expect(buf.readUint8(0)).toBe(0)
    expect(buf.readUint8(1)).toBe(value)
})

test('writeUInt8', () => {
    const value = 222
    const buf = Buffer.alloc(1)
    const bw = new BufferWriter(buf, 0)
    bw.writeUInt8(value)
    expect(buf.readUint8()).toBe(value)
    expect(bw.offset).toBe(1)
})

test('writeInt8', () => {
    const value = 123
    const buf = Buffer.alloc(1)
    const bw = new BufferWriter(buf, 0)
    bw.writeInt8(value)
    expect(buf.readInt8()).toBe(value)
    expect(bw.offset).toBe(1)
})

test('writeUInt16', () => {
    const value = 12345
    const buf = Buffer.alloc(2)
    const bw = new BufferWriter(buf, 0)
    bw.writeUInt16(value)
    expect(buf.readUint16BE()).toBe(value)
    expect(bw.offset).toBe(2)
})

test('writeInt16', () => {
    const value = 12345
    const buf = Buffer.alloc(2)
    const bw = new BufferWriter(buf, 0)
    bw.writeInt16(value)
    expect(buf.readInt16BE()).toBe(value)
    expect(bw.offset).toBe(2)
})

test('writeUInt32', () => {
    const value = 12345678
    const buf = Buffer.alloc(4)
    const bw = new BufferWriter(buf, 0)
    bw.writeUInt32(value)
    expect(buf.readUint32BE()).toBe(value)
    expect(bw.offset).toBe(4)
})

test('writeInt32', () => {
    const value = 12345678
    const buf = Buffer.alloc(4)
    const bw = new BufferWriter(buf, 0)
    bw.writeInt32(value)
    expect(buf.readInt32BE()).toBe(value)
    expect(bw.offset).toBe(4)
})



test('writeFloat32', () => {
    const value = 1.23456789 // this is past 32 bits btw
    const buf = Buffer.alloc(4)
    const bw = new BufferWriter(buf, 0)
    bw.writeFloat32(value)
    expect(buf.readFloatBE()).toBeCloseTo(value)
    expect(bw.offset).toBe(4)
})

test('writeFloat64', () => {
    const value = 1.23456789
    const buf = Buffer.alloc(8)
    const bw = new BufferWriter(buf, 0)
    bw.writeFloat64(value)
    expect(buf.readDoubleBE()).toBeCloseTo(value)
    expect(bw.offset).toBe(8)
})

test('writeUInt8Array', () => {
    const value = new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
    const buf = Buffer.alloc(14)
    const bw = new BufferWriter(buf, 0)
    bw.writeUInt8Array(value)
    // first 4 bytes contain the array length
    expect(buf.readInt32BE(0)).toBe(value.length)
    // subsequent bytes contain the array values
    expect(buf.readUint8(4)).toBe(value[0])
    expect(buf.readUint8(5)).toBe(value[1])
    expect(buf.readUint8(6)).toBe(value[2])
    expect(buf.readUint8(7)).toBe(value[3])
    expect(buf.readUint8(8)).toBe(value[4])
    expect(buf.readUint8(9)).toBe(value[5])
    expect(buf.readUint8(10)).toBe(value[6])
    expect(buf.readUint8(11)).toBe(value[7])
    expect(buf.readUint8(12)).toBe(value[8])
    expect(buf.readUint8(13)).toBe(value[9])
})

test('writeInt8Array', () => {
    const value = new Int8Array([0, 1, 2, 3, -4, -5, 6, 7, 8, 9])
    const buf = Buffer.alloc(14)
    const bw = new BufferWriter(buf, 0)
    bw.writeInt8Array(value)
    // first 4 bytes contain the array length
    expect(buf.readUInt32BE(0)).toBe(value.length)
    // subsequent bytes contain the array values
    expect(buf.readInt8(4)).toBe(value[0])
    expect(buf.readInt8(5)).toBe(value[1])
    expect(buf.readInt8(6)).toBe(value[2])
    expect(buf.readInt8(7)).toBe(value[3])
    expect(buf.readInt8(8)).toBe(value[4])
    expect(buf.readInt8(9)).toBe(value[5])
    expect(buf.readInt8(10)).toBe(value[6])
    expect(buf.readInt8(11)).toBe(value[7])
    expect(buf.readInt8(12)).toBe(value[8])
    expect(buf.readInt8(13)).toBe(value[9])
})

test('writeUInt16Array', () => {
    const value = new Uint16Array([0, 1, 333, 444, 1200, 5555, 2345, 1231, 9999, 65535])
    const buf = Buffer.alloc(24)
    const bw = new BufferWriter(buf, 0)
    bw.writeUInt16Array(value)
    // first 4 bytes contain the array length
    expect(buf.readUInt32BE(0)).toBe(value.length)
    // subsequent bytes contain the array values
    expect(buf.readUint16BE(4)).toBe(value[0])
    expect(buf.readUint16BE(6)).toBe(value[1])
    expect(buf.readUint16BE(8)).toBe(value[2])
    expect(buf.readUint16BE(10)).toBe(value[3])
    expect(buf.readUint16BE(12)).toBe(value[4])
    expect(buf.readUint16BE(14)).toBe(value[5])
    expect(buf.readUint16BE(16)).toBe(value[6])
    expect(buf.readUint16BE(18)).toBe(value[7])
    expect(buf.readUint16BE(20)).toBe(value[8])
    expect(buf.readUint16BE(22)).toBe(value[9])
})

test('writeInt16Array', () => {
    const value = new Int16Array([0, 1, 333, 444, -1200, -5555, 2345, 1231, 9999, 65535])
    const buf = Buffer.alloc(24)
    const bw = new BufferWriter(buf, 0)
    bw.writeInt16Array(value)
    // first 4 bytes contain the array length
    expect(buf.readUInt32BE(0)).toBe(value.length)
    // subsequent bytes contain the array values
    expect(buf.readInt16BE(4)).toBe(value[0])
    expect(buf.readInt16BE(6)).toBe(value[1])
    expect(buf.readInt16BE(8)).toBe(value[2])
    expect(buf.readInt16BE(10)).toBe(value[3])
    expect(buf.readInt16BE(12)).toBe(value[4])
    expect(buf.readInt16BE(14)).toBe(value[5])
    expect(buf.readInt16BE(16)).toBe(value[6])
    expect(buf.readInt16BE(18)).toBe(value[7])
    expect(buf.readInt16BE(20)).toBe(value[8])
    expect(buf.readInt16BE(22)).toBe(value[9])
})

test('writeUInt32Array', () => {
    const value = new Uint32Array([0, 1, 333, 444, 1200, 5555, 2345, 1231, 9999, 12365535])
    const buf = Buffer.alloc(44)
    const bw = new BufferWriter(buf, 0)
    bw.writeUInt32Array(value)
    // first 4 bytes contain the array length
    expect(buf.readUInt32BE(0)).toBe(value.length)
    // subsequent bytes contain the array values
    expect(buf.readUint32BE(4)).toBe(value[0])
    expect(buf.readUint32BE(8)).toBe(value[1])
    expect(buf.readUint32BE(12)).toBe(value[2])
    expect(buf.readUint32BE(16)).toBe(value[3])
    expect(buf.readUint32BE(20)).toBe(value[4])
    expect(buf.readUint32BE(24)).toBe(value[5])
    expect(buf.readUint32BE(28)).toBe(value[6])
    expect(buf.readUint32BE(32)).toBe(value[7])
    expect(buf.readUint32BE(36)).toBe(value[8])
    expect(buf.readUint32BE(40)).toBe(value[9])
})

test('writeInt32Array', () => {
    const value = new Int32Array([0, 1, 333, 444, -1200, -5555, 2345, 1231, 9999, 12365535])
    const buf = Buffer.alloc(44)
    const bw = new BufferWriter(buf, 0)
    bw.writeInt32Array(value)
    // first 4 bytes contain the array length
    expect(buf.readUInt32BE(0)).toBe(value.length)
    // subsequent bytes contain the array values
    expect(buf.readInt32BE(4)).toBe(value[0])
    expect(buf.readInt32BE(8)).toBe(value[1])
    expect(buf.readInt32BE(12)).toBe(value[2])
    expect(buf.readInt32BE(16)).toBe(value[3])
    expect(buf.readInt32BE(20)).toBe(value[4])
    expect(buf.readInt32BE(24)).toBe(value[5])
    expect(buf.readInt32BE(28)).toBe(value[6])
    expect(buf.readInt32BE(32)).toBe(value[7])
    expect(buf.readInt32BE(36)).toBe(value[8])
    expect(buf.readInt32BE(40)).toBe(value[9])
})

test('writeFloat32Array', () => {
    const value = new Float32Array([0, 1, 33.3, 44.4, -1.200, -5.555, 2.345, 1231, 9999, 1236.5535])
    const buf = Buffer.alloc(44)
    const bw = new BufferWriter(buf, 0)
    bw.writeFloat32Array(value)
    // first 4 bytes contain the array length
    expect(buf.readUInt32BE(0)).toBe(value.length)
    // subsequent bytes contain the array values
    expect(buf.readFloatBE(4)).toBe(value[0])
    expect(buf.readFloatBE(8)).toBe(value[1])
    expect(buf.readFloatBE(12)).toBe(value[2])
    expect(buf.readFloatBE(16)).toBe(value[3])
    expect(buf.readFloatBE(20)).toBe(value[4])
    expect(buf.readFloatBE(24)).toBe(value[5])
    expect(buf.readFloatBE(28)).toBe(value[6])
    expect(buf.readFloatBE(32)).toBe(value[7])
    expect(buf.readFloatBE(36)).toBe(value[8])
    expect(buf.readFloatBE(40)).toBe(value[9])
})

test('writeFloat64Array', () => {
    const value = new Float64Array([0, 1, 33.3, 44.4, -1.200, -5.555, 2.345, 1231, 9999, 1236.5535])
    const buf = Buffer.alloc(84)
    const bw = new BufferWriter(buf, 0)
    bw.writeFloat64Array(value)
    // first 4 bytes contain the array length
    expect(buf.readUInt32BE(0)).toBe(value.length)
    // subsequent bytes contain the array values
    expect(buf.readDoubleBE(4)).toBe(value[0])
    expect(buf.readDoubleBE(12)).toBe(value[1])
    expect(buf.readDoubleBE(20)).toBe(value[2])
    expect(buf.readDoubleBE(28)).toBe(value[3])
    expect(buf.readDoubleBE(36)).toBe(value[4])
    expect(buf.readDoubleBE(44)).toBe(value[5])
    expect(buf.readDoubleBE(52)).toBe(value[6])
    expect(buf.readDoubleBE(60)).toBe(value[7])
    expect(buf.readDoubleBE(68)).toBe(value[8])
    expect(buf.readDoubleBE(76)).toBe(value[9])
})

test('writeString', () => {
    const value = 'hello world'
    const buf = Buffer.alloc(4 + value.length)
    const bw = new BufferWriter(buf, 0)
    bw.writeString(value)
    expect(buf.toString('utf-8', 4)).toBe(value)
    /*
    const textBuffer = Buffer.from(value, 'utf-8')
    const buf = Buffer.alloc(4 + textBuffer.byteLength)
    
    let offset = 0
    buf.writeUInt32BE(textBuffer.byteLength, offset)
    offset +=4
    buf.write(value, 'utf-8')
    */
})
