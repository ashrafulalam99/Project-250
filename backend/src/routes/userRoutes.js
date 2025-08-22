import express from 'express';
import { 
  getProfile, 
  getUserProfile, 
  updateProfile 
} from '../controllers/userController.js';

const router = express.Router();

// Protected routes (authMiddleware applied globally in server.js)
// own profile
router.get('/me', getProfile);           
// update own profile
router.put('/me', updateProfile);       
// view public profile of another user
router.get('/:id', getUserProfile);          
export default router;
