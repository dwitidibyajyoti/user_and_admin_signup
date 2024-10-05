import jwt from 'jsonwebtoken';

// Define the secret key (usually this is stored in environment variables)
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Function to generate JWT token
export function generateToken(userData: { id: string; role?: string }): string {
    return jwt.sign(
        { id: userData.id, role: userData.role },
        JWT_SECRET,
        { expiresIn: '1h' } // Token expiration time
    );
}