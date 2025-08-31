import express from 'express';
import { createItem, getItems, getItemById, deleteItem } from '../controllers/itemController.js';

const router = express.Router();

// Global JWT applied in server.js, no need to call authMiddleware here
router.post('/', createItem);
router.get('/', getItems);
router.get('/:id', getItemById);
router.delete('/:id', deleteItem);

export default router;
