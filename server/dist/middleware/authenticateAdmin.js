"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const authMiddleware = (req, res, next) => {
    var _a;
    const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    jsonwebtoken_1.default.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        const decodedToken = decoded;
        // Check if the user is an admin
        if (decodedToken.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden: Admins only' });
        }
        // Attach user ID and role to the request object
        const user = {
            id: decodedToken.id,
            role: decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.role
        };
        req.user = user;
        next();
    });
};
exports.default = authMiddleware;
