// src/controllers/userController.js
import { User } from '../models/userModel.js';

// View own profile
export async function getProfile(req, res, next) {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const items = await User.getItemsByUser(req.user.id);
    res.json({ user, items }); // include items here
  } catch (err) {
    next(err);
  }
}


// Update own profile
export async function updateProfile(req, res, next) {
  try {
    const updatedUser = await User.updateUser(req.user.id, req.body);
    if (!updatedUser) return res.status(400).json({ message: 'No fields to update' });
    res.json({ message: 'Profile updated', user: updatedUser });
  } catch (err) {
    next(err);
  }
}

// Get public profile + their items
export async function getUserProfile(req, res, next) {
  try {
    const userId = req.params.id;
    const user = await User.findPublicById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const items = await User.getItemsByUser(userId);
    res.json({ user, items });
  } catch (err) {
    next(err);
  }
}
