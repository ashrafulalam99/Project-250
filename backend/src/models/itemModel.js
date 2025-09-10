// src/models/itemModel.js
import { pool } from '../core/db.js';

export class Item {
  // Create a new lost/found item
  static async create({ user_id, name, description, image_url = null, status }) {
    if (!name || !description || !status) {
      throw new Error('Name, description, and status are required');
    }

    const [result] = await pool.query(
      `INSERT INTO items (user_id, name, description, image_url, status)
       VALUES (?, ?, ?, ?, ?)`,
      [user_id, name, description, image_url, status]
    );

    return { id: result.insertId, user_id, name, description, image_url, status };
  }

  // Get all items (optional search, filter, pagination, sorting)
  static async getAll({ name, status, limit = 20, offset = 0, sort = 'DESC' }) {
    let sql = `SELECT i.*, u.name AS user_name, u.email AS user_email
               FROM items i
               JOIN users u ON i.user_id = u.id`;
    const conditions = [];
    const params = [];

    if (name) {
      // Case-insensitive search
      conditions.push('LOWER(i.name) LIKE ?');
      params.push(`%${name.toLowerCase()}%`);
    }

    if (status) {
      conditions.push('i.status = ?');
      params.push(status);
    }

    if (conditions.length > 0) {
      sql += ' WHERE ' + conditions.join(' AND ');
    }

    sql += ` ORDER BY i.created_at ${sort} LIMIT ? OFFSET ?`;
    params.push(Number(limit), Number(offset));

    const [rows] = await pool.query(sql, params);
    return rows;
  }

  // Find single item by ID
  static async findById(id) {
    const [rows] = await pool.query(
      `SELECT i.*, u.name AS user_name, u.email AS user_email
       FROM items i
       JOIN users u ON i.user_id = u.id
       WHERE i.id = ? LIMIT 1`,
      [id]
    );
    return rows[0];
  }

  // Delete item by ID
  static async deleteById(id) {
    const [result] = await pool.query(
      `DELETE FROM items WHERE id = ?`,
      [id]
    );
    return result.affectedRows > 0; // returns true if deleted
  }

  // Optional: get all items for a specific user
  static async getItemsByUser(user_id) {
    const [rows] = await pool.query(
      `SELECT * FROM items WHERE user_id = ? ORDER BY created_at DESC`,
      [user_id]
    );
    return rows;
  }
}
