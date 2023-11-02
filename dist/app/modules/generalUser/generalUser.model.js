"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralUser = void 0;
const mongoose_1 = require("mongoose");
const GeneralUserSchema = new mongoose_1.Schema({
    name: {
        type: String,
    },
    address: {
        type: String,
    },
    gender: {
        type: String,
    },
    profileImage: {
        type: String,
    },
    dateOfBirth: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
    },
}, {
    timestamps: true,
});
exports.GeneralUser = (0, mongoose_1.model)('GeneralUser', GeneralUserSchema);
