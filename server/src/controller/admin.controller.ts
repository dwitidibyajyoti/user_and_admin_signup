import { Request, Response } from 'express';
import User from '../model/User.model'; // Adjust the path as necessary
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Admin from '../model/Admin.model';
import { generateToken } from '../helper/helper';



// Register Admin
export const registerAdmin = async (req: Request, res: Response): Promise<any> => {
    const { name, age, address, email, password } = req.body;

    try {
        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({
                success: false,
                message: 'Admin already registered, please log in'
            });
        }

        // Hash password and create new admin
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({ name, age, address, email, password: hashedPassword });
        await newAdmin.save();

        // Generate JWT token
        const token = await generateToken({ id: newAdmin._id.toString(), role: newAdmin.role });

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
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
// Register a new admin
export const loginAdmin = async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Generate JWT token
        const token = await generateToken({ id: admin._id.toString(), role: admin.role });

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
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Delete a user by ID
export const deleteUser = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    try {
        const deletedUser = await User.findByIdAndUpdate(
            id,
            { deletedAt: new Date() }, // Set deletedAt to the current date and time
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
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
            data: null
        });
    }
};

// Get all users
export const getAllUsers = async (req: Request, res: Response): Promise<any> => {
    try {
        const users = await User.find({ deletedAt: null }).select('-password'); // Exclude users with a deletedAt timestamp
        return res.status(200).json({
            success: true,
            message: 'Users retrieved successfully',
            data: users // Return the array of users
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
            data: null
        });
    }
};

