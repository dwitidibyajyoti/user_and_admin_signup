import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { userLoginSchema, userRegistrationSchema } from '../validation/user.validation';
import User from '../model/User.model';
import { generateToken } from '../helper/helper';
// import { ApiResponse } from '../types/ApiResponse';
export const registerUser = async (req: Request, res: Response): Promise<any> => {
    const { error } = userRegistrationSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
            data: null
        });
    }

    const { name, age, address, email, password } = req.body;

    try {

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            // If user exists, return response
            return res.status(400).json({ message: 'User already registered. Please log in.', success: true, data: null });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, age, address, email, password: hashedPassword });
        await user.save();

        // Exclude password from the response
        const { password: _, ...userResponse } = user.toObject();

        // Optionally create a token (if needed, e.g., for login)
        const token = await generateToken({ id: user._id.toString() });


        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: userResponse,
            token // Optional, include it only if needed
        });
    } catch (error: any) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
            data: null
        });
    }
};


export const loginUser = async (req: Request, res: Response): Promise<any> => {
    const { error } = userLoginSchema.validate(req.body); // Validate request body

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
            data: null
        });
    }

    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email, deletedAt: null });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
                data: null
            });
        }

        // Compare the password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
                data: null
            });
        }

        // Exclude password from the response
        const { password: _, ...userResponse } = user.toObject();

        // Create a token
        const token = await generateToken({ id: user._id.toString() });

        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: userResponse,
            token // Return the token
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
            data: null
        });
    }
};
