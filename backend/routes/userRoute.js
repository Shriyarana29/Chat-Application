import express from 'express';
import { signup, login, updateProfile, checkAuth } from '../controllers/userController';
import { protectRoute } from '../middlewares/auth';

const userRouter = express.Router();

userRouter.post('/signup', signup);
userRouter.post('/login', login);
userRouter.get('/check', protectRoute, checkAuth);
userRouter.put('/update-profile', protectRoute, updateProfile);

export default userRouter;