import { pool } from '../core/db.js';

export class NotificationModel {
  // Create notifications for all users except the actor
  static async createForAllExcept(actorId, itemId = null, type, message) {
    const [users] = await pool.query(
      `SELECT id FROM users WHERE id != ?`,
      [actorId]
    );
    if (!users.length) return;

    const values = users.map(u => [u.id, actorId, itemId, type, message]);
    await pool.query(
      `INSERT INTO notifications (user_id, actor_id, item_id, type, message) VALUES ?`,
      [values]
    );
  }

  // Get notifications for a user
  static async getForUser(userId) {
    const [rows] = await pool.query(
      `SELECT n.*, u.name AS actor_name
       FROM notifications n
       JOIN users u ON n.actor_id = u.id
       WHERE n.user_id = ?
       ORDER BY n.created_at DESC`,
      [userId]
    );
    return rows;
  }

  // Mark notification as read
  static async markAsRead(notificationId) {
    await pool.query(
      `UPDATE notifications SET read_status = TRUE WHERE id = ?`,
      [notificationId]
    );
  }
}
