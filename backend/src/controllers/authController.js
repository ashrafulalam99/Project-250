import { Auth } from '../models/authModel.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

// Signup controller
export async function signup(req, res, next) {
  try {
    const { name, email, password, contact, location } = req.body;

    // Check required fields
    if (!name || !email || !password || !contact || !location) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if email already exists
    const existingUser = await Auth.findByEmail(email);
    if (existingUser) return res.status(409).json({ message: 'Email already registered' });

    // Create new user
    const newUser = await Auth.createUser({ name, email, password, contact, location });

    // ✅ Generate JWT token immediately after signup
    const token = jwt.sign({ id: newUser.id, email: newUser.email }, JWT_SECRET, { expiresIn: '1h' });

    // Respond with user info + token
    res.status(201).json({
      message: 'User created successfully',
      user: newUser,
      token
    });

  } catch (err) {
    next(err);
  }
}

// Login controller
export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

    const user = await Auth.verifyUser({ email, password });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        contact: user.contact,
        location: user.location
      }
    });
  } catch (err) {
    next(err);
  }
}
