import { Schema, model, Document } from 'mongoose';

interface IAdmin extends Document {
    _id: string;
    name: string;
    age: number;
    address: string;
    email: string;
    password: string;
    role: string;
    deletedAt?: Date; // New field for soft delete timestamp
    createdAt?: Date;
    updatedAt?: Date;
}

const adminSchema = new Schema<IAdmin>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    deletedAt: {
        type: Date, // Store the date when the user is soft deleted
        default: null // Default is null when not deleted
    },
    role: {
        type: String,
        default: 'admin'
    }
}, { timestamps: true });  // Automatically adds `createdAt` and `updatedAt`

const Admin = model<IAdmin>('Admin', adminSchema);

export default Admin;

