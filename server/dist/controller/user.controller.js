"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_validation_1 = require("../validation/user.validation");
const User_model_1 = __importDefault(require("../model/User.model"));
const helper_1 = require("../helper/helper");
// import { ApiResponse } from '../types/ApiResponse';
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = user_validation_1.userRegistrationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
            data: null
        });
    }
    const { name, age, address, email, password } = req.body;
    try {
        // Check if user already exists
        const existingUser = yield User_model_1.default.findOne({ email });
        if (existingUser) {
            // If user exists, return response
            return res.status(400).json({ message: 'User already registered. Please log in.', success: true, data: null });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = new User_model_1.default({ name, age, address, email, password: hashedPassword });
        yield user.save();
        // Exclude password from the response
        const _a = user.toObject(), { password: _ } = _a, userResponse = __rest(_a, ["password"]);
        // Optionally create a token (if needed, e.g., for login)
        const token = yield (0, helper_1.generateToken)({ id: user._id.toString() });
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: userResponse,
            token // Optional, include it only if needed
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
            data: null
        });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = user_validation_1.userLoginSchema.validate(req.body); // Validate request body
    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
            data: null
        });
    }
    const { email, password } = req.body;
    try {
        // Find the user by email
        const user = yield User_model_1.default.findOne({ email, deletedAt: null });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
                data: null
            });
        }
        // Compare the password with the hashed password
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
                data: null
            });
        }
        // Exclude password from the response
        const _a = user.toObject(), { password: _ } = _a, userResponse = __rest(_a, ["password"]);
        // Create a token
        const token = yield (0, helper_1.generateToken)({ id: user._id.toString() });
        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: userResponse,
            token // Return the token
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
            data: null
        });
    }
});
exports.loginUser = loginUser;
