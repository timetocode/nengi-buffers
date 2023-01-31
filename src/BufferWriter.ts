import { IBinaryWriter, IBinaryWriterClass } from 'nengi'
import { Buffer } from 'buffer'

class BufferWriter implements IBinaryWriter {
    buffer: Buffer
    offset: number

    constructor(buffer: Buffer, offset?: number) {
        this.buffer = buffer
        this.offset = offset || 0
    }

    static create(byteLength: number) {
        return new BufferWriter(Buffer.allocUnsafe(byteLength))
    }

    writeUInt8(value: number) {
        this.buffer.writeUInt8(value, this.offset)
        this.offset += 1
    }

    writeInt8(value: number) {
        this.buffer.writeInt8(value, this.offset)
        this.offset += 1
    }

    writeUInt16(value: number) {
        this.buffer.writeUInt16BE(value, this.offset)
        this.offset += 2
    }

    writeInt16(value: number) {
        this.buffer.writeInt16BE(value, this.offset)
        this.offset += 2
    }

    writeUInt32(value: number) {
        this.buffer.writeUInt32BE(value, this.offset)
        this.offset += 4
    }

    writeInt32(value: number) {
        this.buffer.writeInt32BE(value, this.offset)
        this.offset += 4
    }

    writeFloat32(value: number) {
        this.buffer.writeFloatBE(value, this.offset)
        this.offset += 4
    }

    writeFloat64(value: number) {
        this.buffer.writeDoubleBE(value, this.offset)
        this.offset += 8
    }

    writeString(value: string) {
        const length = Buffer.byteLength(value, 'utf8')
        this.writeUInt32(length)
        this.buffer.write(value, this.offset, 'utf8')
        this.offset += length
    }

    writeUInt8Array(value: Uint8Array) {
        const length = value.byteLength
        this.writeUInt32(length)
        for (let i = 0; i < value.length; i++) {
            this.writeUInt8(value[i])
        }
    }
}

export { BufferWriter }
