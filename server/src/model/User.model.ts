import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
    _id: string;
    name: string;
    age: number;
    address: string;
    email: string;
    password: string;
    createdAt?: Date;
    deletedAt?: Date; // New field for soft delete timestamp
    updatedAt?: Date;
}

const userSchema = new Schema<IUser>({
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
    deletedAt: {
        type: Date, // Store the date when the user is soft deleted
        default: null // Default is null when not deleted
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });  // Automatically adds `createdAt` and `updatedAt`

const User = model<IUser>('User', userSchema);

export default User;
