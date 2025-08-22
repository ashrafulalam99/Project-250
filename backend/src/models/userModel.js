// src/models/userModel.js
import { pool } from '../core/db.js';
import bcrypt from 'bcrypt';

export class User {
  // Create a new user (optional, used by authModel)
  static async create({ name, email, password }) {
    const [result] = await pool.query(
      `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
      [name, email, password]
    );
    return { id: result.insertId, name, email };
  }

  // Find user by ID (full info)
  static async findById(id) {
    const [rows] = await pool.query(
      `SELECT id, name, email, created_at FROM users WHERE id = ? LIMIT 1`,
      [id]
    );
    return rows[0];
  }

  // Find public user profile (limited info)
  static async findPublicById(id) {
    const [rows] = await pool.query(
      `SELECT id, name, created_at FROM users WHERE id = ? LIMIT 1`,
      [id]
    );
    return rows[0];
  }

  // Find user by email
  static async findByEmail(email) {
    const [rows] = await pool.query(
      `SELECT * FROM users WHERE email = ? LIMIT 1`,
      [email]
    );
    return rows[0];
  }

  // Update user profile
  static async updateUser(id, { name, email, password }) {
    const fields = [];
    const values = [];

    if (name) { fields.push('name = ?'); values.push(name); }
    if (email) { fields.push('email = ?'); values.push(email); }
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      fields.push('password = ?'); 
      values.push(hashedPassword);
    }

    if (fields.length === 0) return null;

    values.push(id); // WHERE id = ?
    const sql = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`;
    await pool.query(sql, values);

    return this.findById(id);
  }

  // Get all items reported by user
  static async getItemsByUser(user_id) {
    const [rows] = await pool.query(
      `SELECT i.*, u.name AS user_name, u.email AS user_email
       FROM items i
       JOIN users u ON i.user_id = u.id
       WHERE u.id = ? ORDER BY i.created_at DESC`,
      [user_id]
    );
    return rows;
  }
}
