// src/models/authModel.js
import { pool } from '../core/db.js';
import bcrypt from 'bcrypt';

export class Auth {
  // Check if a user exists by email
  static async findByEmail(email) {
    const [rows] = await pool.query(
      `SELECT * FROM users WHERE email = ? LIMIT 1`,
      [email]
    );
    return rows[0]; // undefined if not found
  }

  // Create a new user with hashed password
  static async createUser({ name, email, password }) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
      [name, email, hashedPassword]
    );

    return { id: result.insertId, name, email };
  }

  // Verify user credentials for login
  static async verifyUser({ email, password }) {
    const user = await this.findByEmail(email);
    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null;

    return user;
  }
}
