import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from './routes/user.routes';
import responseMiddleware from './middleware/responseMiddleware';
import adminRoute from './routes/admin.routes';
import cors from 'cors';
dotenv.config();

const app: Application = express();



// Enable CORS with default settings
app.use(cors());
// app.use(responseMiddleware);
// Middleware
app.use(express.json());

// Middleware to parse JSON requests
app.use(express.json());

// Use user routes
app.use('/api/users', userRoute);
app.use('/api/admin', adminRoute);

// MongoDB Connection
const mongoUri: string = process.env.MONGO_URI || '';

mongoose.connect(mongoUri).then(() => console.log('MongoDB connected')).catch((err) => console.log(err));

// Start server
const PORT: number = parseInt(process.env.PORT || '3000');

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
