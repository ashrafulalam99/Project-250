// src/controllers/notificationController.js
import { NotificationModel } from '../models/notificationModel.js';

// Get all notifications for logged-in user
export async function getMyNotifications(req, res, next) {
  try {
    const userId = req.user.id;
    const notifications = await NotificationModel.getForUser(userId);
    res.json(notifications);
  } catch (err) {
    next(err);
  }
}

// Mark a single notification as read AND return updated unread count
export async function markNotificationRead(req, res, next) {
  try {
    const { id } = req.params;

    // Mark as read
    await NotificationModel.markAsRead(id);

    // Compute unread count after update
    const notifications = await NotificationModel.getForUser(req.user.id);
    const unreadCount = notifications.filter(n => !n.read_status).length;

    res.json({
      message: 'Notification marked as read',
      unreadCount, // 👈 new: send updated count
    });
  } catch (err) {
    next(err);
  }
}

// Optional: Separate endpoint for unread count only
export async function getUnreadCount(req, res, next) {
  try {
    const notifications = await NotificationModel.getForUser(req.user.id);
    const unreadCount = notifications.filter(n => !n.read_status).length;
    res.json({ unreadCount });
  } catch (err) {
    next(err);
  }
}
