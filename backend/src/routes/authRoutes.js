import express from 'express';
import { signup, login } from '../controllers/userController.js';

const router = express.Router();

// Public routes
router.post('/signup', signup);
router.post('/login', login);

export default router;