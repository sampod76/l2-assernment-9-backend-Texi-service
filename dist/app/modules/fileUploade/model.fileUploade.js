"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploade = void 0;
const mongoose_1 = require("mongoose");
const FileUploadeSchema = new mongoose_1.Schema({
    path: {
        type: String,
        trim: true,
    },
    size: {
        type: Number,
        default: 0,
    },
    filename: {
        type: String,
        required: true,
    },
    url: String,
    mimetype: {
        type: String,
    },
}, {
    timestamps: true,
    // strict: 'throw',
    toJSON: {
        virtuals: true,
    },
});
// s
exports.FileUploade = (0, mongoose_1.model)('FileUploade', FileUploadeSchema);
