import type { BinaryAdapter } from 'nengi'
import { BufferReader } from './BufferReader'
import { BufferWriter } from './BufferWriter'

const bufferBinary: BinaryAdapter<Buffer> = {
    createWriter(byteLength: number) {
        return BufferWriter.create(byteLength)
    },
    createReader(payload: Buffer) {
        return new BufferReader(payload)
    }
}

export { bufferBinary }
