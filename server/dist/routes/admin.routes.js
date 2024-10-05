"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controller_1 = require("../controller/admin.controller");
const authenticateAdmin_1 = __importDefault(require("../middleware/authenticateAdmin"));
// import { registerAdmin, loginAdmin, deleteUser, getAllUsers } from '../controllers/adminController';
const adminRoute = (0, express_1.Router)();
// Admin routes
adminRoute.post('/register', admin_controller_1.registerAdmin);
adminRoute.post('/login', admin_controller_1.loginAdmin);
adminRoute.delete('/delete-user/:id', authenticateAdmin_1.default, admin_controller_1.deleteUser);
adminRoute.get('/all-users', authenticateAdmin_1.default, admin_controller_1.getAllUsers);
exports.default = adminRoute;
