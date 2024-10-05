"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responseMiddleware = (req, res, next) => {
    res.error = (code, message) => {
        return res.status(code).json({
            success: false,
            message,
            data: null,
        });
    };
    res.success = (code, message, data) => {
        return res.status(code).json({
            success: true,
            message,
            data,
        });
    };
    next();
};
exports.default = responseMiddleware;
