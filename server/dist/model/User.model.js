"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    deletedAt: {
        type: Date, // Store the date when the user is soft deleted
        default: null // Default is null when not deleted
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true }); // Automatically adds `createdAt` and `updatedAt`
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
