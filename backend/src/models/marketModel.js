import { pool } from '../core/db.js';

export class MarketModel {
  // Create a new marketplace item
  static async create({ user_id, title, description = null, type, price = null, image_url = null }) {
    if (!title || !type) {
      throw new Error('Title and type are required');
    }

    const [result] = await pool.query(
      `INSERT INTO marketplace_items (user_id, title, description, type, price, image_url)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [user_id, title, description, type, price, image_url]
    );

    return {
      id: result.insertId,
      user_id,
      title,
      description,
      type,
      price,
      image_url,
      status: 'available'
    };
  }

  // Get all marketplace items, optionally filtered by type and search term (case-insensitive)
  static async getAll({ type, search } = {}) {
    let sql = `SELECT m.*, u.name AS user_name, u.email AS user_email
               FROM marketplace_items m
               JOIN users u ON m.user_id = u.id`;
    const conditions = [];
    const params = [];

    // Case-insensitive search by title
    if (search) {
      conditions.push('LOWER(m.title) LIKE ?');
      params.push(`%${search.toLowerCase()}%`);
    }

    // Filter by type if provided
    if (type && ['buy', 'sell'].includes(type)) {
      conditions.push('m.type = ?');
      params.push(type);
    }

    if (conditions.length > 0) {
      sql += ' WHERE ' + conditions.join(' AND ');
    }

    sql += ' ORDER BY m.created_at DESC';

    const [rows] = await pool.query(sql, params);
    return rows;
  }

  // Find a single item by ID
  static async findById(id) {
    const [rows] = await pool.query(
      `SELECT m.*, u.name AS user_name, u.email AS user_email
       FROM marketplace_items m
       JOIN users u ON m.user_id = u.id
       WHERE m.id = ? LIMIT 1`,
      [id]
    );
    return rows[0];
  }

  // Delete an item by ID
  static async deleteById(id) {
    const [result] = await pool.query(
      `DELETE FROM marketplace_items WHERE id = ?`,
      [id]
    );
    return result.affectedRows > 0;
  }

  // Get all items belonging to a specific user
  static async getItemsByUser(user_id) {
    const [rows] = await pool.query(
      `SELECT * FROM marketplace_items WHERE user_id = ? ORDER BY created_at DESC`,
      [user_id]
    );
    return rows;
  }
}
