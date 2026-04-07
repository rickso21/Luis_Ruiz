import express from 'express';
import { MessageController } from '../controllers/MessageController';

const router = express.Router();

router.get('/messages', MessageController.getMessages);
router.post('/messages', MessageController.createMessage);
router.post('/messages/like', MessageController.likeMessage);

export default router;