import express from 'express';
import { protectRoute } from '../middleware/authMiddleware.js';
import { getMessages, getUsersForSidebar, markMessageAsSeen, sendMessage} from '../controllers/messageController.js';

const messageRouter = express.Router();

messageRouter.get('/users', protectRoute, getUsersForSidebar);
messageRouter.post('/:id', protectRoute, getMessages);
messageRouter.put('/mark/:id', protectRoute, markMessageAsSeen);
messageRouter.post('/send/:id', protectRoute, sendMessage);

export default messageRouter;
