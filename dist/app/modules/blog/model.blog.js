"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blog = void 0;
const mongoose_1 = require("mongoose");
const BlogSchema = new mongoose_1.Schema({
    title: {
        type: String,
    },
    image: String,
    content: {
        type: String,
    },
    comments: [String],
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
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
exports.Blog = (0, mongoose_1.model)('Blog', BlogSchema);
