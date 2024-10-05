import { Router } from 'express';
import { loginUser, registerUser } from '../controller/user.controller';
// import { registerUser, loginUser } from '../controller/user.controller';

const userRoute = Router();

// User routes
userRoute.post('/register', registerUser);

userRoute.post('/login', loginUser);

export default userRoute;


