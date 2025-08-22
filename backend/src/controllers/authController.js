// src/controllers/authController.js
import { Auth } from '../models/authModel.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

// Signup controller
export async function signup(req, res, next) {
  try {
    const { name, email, password, contact, location } = req.body;

    if (!name || !email || !password || !contact || !location) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await Auth.findByEmail(email);
    if (existingUser) return res.status(409).json({ message: 'Email already registered' });

    const newUser = await Auth.createUser({ name, email, password, contact, location });

    res.status(201).json({ message: 'User created', user: newUser });
  } catch (err) {
    next(err);
  }
}

// Login controller
export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await Auth.verifyUser({ email, password });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Login successful', token });
  } catch (err) {
    next(err);
  }
}
