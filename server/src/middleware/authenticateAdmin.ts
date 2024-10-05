// src/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface DecodedToken {
    id: string;
    role: string;
}
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';


const authMiddleware = (req: Request, res: Response, next: NextFunction): any => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        const decodedToken = decoded as DecodedToken;

        // Check if the user is an admin
        if (decodedToken.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden: Admins only' });
        }

        // Attach user ID and role to the request object

        const user = {
            id: decodedToken.id,
            role: decodedToken?.role
        }
        req.user = user;

        next();
    });
};

export default authMiddleware;
