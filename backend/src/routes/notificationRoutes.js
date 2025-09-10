import express from 'express';
import { getMyNotifications, markNotificationRead, getUnreadCount } from '../controllers/notificationController.js';

const router = express.Router();

router.get('/', getMyNotifications);
router.post('/:id/read', markNotificationRead);
router.get('/unread-count', getUnreadCount);

export default router;
