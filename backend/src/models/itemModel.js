import { pool } from '../core/db.js';

export class Item {
  // Create a new item
  static async create({ user_id, name, description, image_url = null, status }) {
    // Validate required fields
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

  // Get all items (optionally filter by name)
  static async getAll({ name }) {
    let sql = `SELECT i.*, u.name AS user_name, u.email AS user_email
               FROM items i
               JOIN users u ON i.user_id = u.id`;
    const params = [];

    if (name) {
      sql += ` WHERE i.name LIKE ?`;
      params.push(`%${name}%`);
    }

    const [rows] = await pool.query(sql, params);
    return rows;
  }

  // Find item by ID
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
}
