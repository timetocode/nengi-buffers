import { IBinaryReader } from 'nengi'

class BufferReader implements IBinaryReader {
    buffer: Buffer
    offset: number

    constructor(buffer: Buffer, offset?: number) {
        this.buffer = buffer
        this.offset = offset || 0
    }

    get byteLength() {
        return this.buffer.byteLength
    }

    readUInt8(): number {
        const value = this.buffer.readUInt8(this.offset)
        this.offset += 1
        return value
    }

    readInt8(): number {
        const value = this.buffer.readInt8(this.offset)
        this.offset += 1
        return value
    }

    readUInt16(): number {
        const value = this.buffer.readUInt16BE(this.offset)
        this.offset += 2
        return value
    }

    readInt16(): number {
        const value = this.buffer.readInt16BE(this.offset)
        this.offset += 2
        return value
    }

    readUInt32(): number {
        const value = this.buffer.readUInt32BE(this.offset)
        this.offset += 4
        return value
    }

    readInt32(): number {
        const value = this.buffer.readInt32BE(this.offset)
        this.offset += 4
        return value
    }

    readFloat32(): number {
        const value = this.buffer.readFloatBE(this.offset)
        this.offset += 4
        return value
    }

    readFloat64(): number {
        const value = this.buffer.readDoubleBE(this.offset)
        this.offset += 8
        return value
    }

    readString(): string {
        const length = this.readUInt32()
        const value = this.buffer.toString('utf8', this.offset, this.offset + length)
        this.offset += length
        return value
    }

    readUInt8Array(): Uint8Array {
        const length = this.readUInt32()
        // console.log({ length })
        const arr = new Uint8Array(length)
        for (let i = 0; i < length; i++) {
            arr[i] = this.readUInt8()
            //console.log(i, arr[i])
        }
        return arr
    }
}

export { BufferReader }
