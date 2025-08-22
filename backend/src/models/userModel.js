// src/models/User.js
import { pool } from '../core/db.js';

export class User {
  // Create a new user
  static async create({ name, email, password }) {
    const [result] = await pool.query(
      `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
      [name, email, password]
    );
    return { id: result.insertId, name, email };
  }

// Fetch public profile by ID (limited info)
  static async findPublicById(id) {
    const [rows] = await pool.query(
      `SELECT id, name, created_at FROM users WHERE id = ? LIMIT 1`,
      [id]
    );
    return rows[0];
  }

  // Find by ID
  static async findById(id) {
    const [rows] = await pool.query(
      `SELECT id, name, email, created_at FROM users WHERE id = ? LIMIT 1`,
      [id]
    );
    return rows[0];
  }

  // Find a user by email
  static async findByEmail(email) {
    const [rows] = await pool.query(
      `SELECT * FROM users WHERE email = ? LIMIT 1`,
      [email]
    );
    return rows[0]; // undefined if not found
  }
}
