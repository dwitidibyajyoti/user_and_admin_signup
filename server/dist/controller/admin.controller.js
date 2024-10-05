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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.deleteUser = exports.loginAdmin = exports.registerAdmin = void 0;
const User_model_1 = __importDefault(require("../model/User.model")); // Adjust the path as necessary
const bcrypt_1 = __importDefault(require("bcrypt"));
const Admin_model_1 = __importDefault(require("../model/Admin.model"));
const helper_1 = require("../helper/helper");
// Register Admin
const registerAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, age, address, email, password } = req.body;
    try {
        // Check if admin already exists
        const existingAdmin = yield Admin_model_1.default.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({
                success: false,
                message: 'Admin already registered, please log in'
            });
        }
        // Hash password and create new admin
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newAdmin = new Admin_model_1.default({ name, age, address, email, password: hashedPassword });
        yield newAdmin.save();
        // Generate JWT token
        const token = yield (0, helper_1.generateToken)({ id: newAdmin._id.toString(), role: newAdmin.role });
        return res.status(201).json({
            success: true,
            message: 'Admin registered successfully',
            data: {
                id: newAdmin._id,
                name: newAdmin.name,
                email: newAdmin.email,
                role: newAdmin.role
            },
            token // Return the token
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
});
exports.registerAdmin = registerAdmin;
// Register a new admin
const loginAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const admin = yield Admin_model_1.default.findOne({ email });
        if (!admin) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }
        // Compare passwords
        const isMatch = yield bcrypt_1.default.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }
        // Generate JWT token
        const token = yield (0, helper_1.generateToken)({ id: admin._id.toString(), role: admin.role });
        return res.status(200).json({
            success: true,
            message: 'Login successful',
            data: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role
            },
            token // Return the token
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
});
exports.loginAdmin = loginAdmin;
// Delete a user by ID
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedUser = yield User_model_1.default.findByIdAndUpdate(id, { deletedAt: new Date() }, // Set deletedAt to the current date and time
        { new: true } // Return the updated document
        );
        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
                data: null
            });
        }
        return res.status(200).json({
            success: true,
            message: 'User deleted successfully',
            data: null
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
exports.deleteUser = deleteUser;
// Get all users
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_model_1.default.find({ deletedAt: null }).select('-password'); // Exclude users with a deletedAt timestamp
        return res.status(200).json({
            success: true,
            message: 'Users retrieved successfully',
            data: users // Return the array of users
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
exports.getAllUsers = getAllUsers;
