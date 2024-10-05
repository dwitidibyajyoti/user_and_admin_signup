"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = generateToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Define the secret key (usually this is stored in environment variables)
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
// Function to generate JWT token
function generateToken(userData) {
    return jsonwebtoken_1.default.sign({ id: userData.id, role: userData.role }, JWT_SECRET, { expiresIn: '1h' } // Token expiration time
    );
}
