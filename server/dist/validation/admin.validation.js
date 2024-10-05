"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginAdminSchema = exports.registerAdminSchema = void 0;
const joi_1 = __importDefault(require("joi"));
// Validation schema for registering an admin
const registerAdminSchema = joi_1.default.object({
    name: joi_1.default.string().required().min(3).max(30),
    age: joi_1.default.number().integer().min(18).max(100).required(),
    address: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required().min(6)
});
exports.registerAdminSchema = registerAdminSchema;
// Validation schema for logging in an admin
const loginAdminSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required().min(6)
});
exports.loginAdminSchema = loginAdminSchema;
