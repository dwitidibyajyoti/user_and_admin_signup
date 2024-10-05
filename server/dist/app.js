"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const admin_routes_1 = __importDefault(require("./routes/admin.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// app.use(responseMiddleware);
// Middleware
app.use(express_1.default.json());
// Middleware to parse JSON requests
app.use(express_1.default.json());
// Use user routes
app.use('/api/users', user_routes_1.default);
app.use('/api/admin', admin_routes_1.default);
// MongoDB Connection
const mongoUri = process.env.MONGO_URI || '';
mongoose_1.default.connect(mongoUri).then(() => console.log('MongoDB connected')).catch((err) => console.log(err));
// Start server
const PORT = parseInt(process.env.PORT || '3000');
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
