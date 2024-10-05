import { Router } from 'express';
import { deleteUser, getAllUsers, loginAdmin, registerAdmin } from '../controller/admin.controller';
import authMiddleware from '../middleware/authenticateAdmin';
// import { registerAdmin, loginAdmin, deleteUser, getAllUsers } from '../controllers/adminController';

const adminRoute = Router();

// Admin routes
adminRoute.post('/register', registerAdmin);
adminRoute.post('/login', loginAdmin);
adminRoute.delete('/delete-user/:id', authMiddleware, deleteUser);
adminRoute.get('/all-users', authMiddleware, getAllUsers);

export default adminRoute;