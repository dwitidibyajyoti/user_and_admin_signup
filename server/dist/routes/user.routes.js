"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controller/user.controller");
// import { registerUser, loginUser } from '../controller/user.controller';
const userRoute = (0, express_1.Router)();
// User routes
userRoute.post('/register', user_controller_1.registerUser);
userRoute.post('/login', user_controller_1.loginUser);
exports.default = userRoute;
