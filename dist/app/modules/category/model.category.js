"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const mongoose_1 = require("mongoose");
const CategorySchema = new mongoose_1.Schema({
    title: {
        type: String,
        // lowercase: true,
        required: true,
        unique: true,
        trim: true,
    },
    image: {
        type: String,
    },
    status: {
        type: String,
        default: 'active',
    },
}, {
    timestamps: true,
    // strict: 'throw',
    toJSON: {
        virtuals: true,
    },
});
exports.Category = (0, mongoose_1.model)('Category', CategorySchema);
