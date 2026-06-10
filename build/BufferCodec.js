"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bufferCodec = void 0;
const BufferReader_1 = require("./BufferReader");
const BufferWriter_1 = require("./BufferWriter");
const bufferCodec = {
    createWriter(byteLength) {
        return BufferWriter_1.BufferWriter.create(byteLength);
    },
    createReader(payload) {
        return new BufferReader_1.BufferReader(payload);
    }
};
exports.bufferCodec = bufferCodec;
