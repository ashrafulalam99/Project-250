import express from 'express';
import { createMarketItem, getAllMarketItems, getMarketItemById, getMyMarketItems, getUserMarketItems, deleteMarketItem } from '../controllers/marketController.js';

const router = express.Router();

router.post('/', createMarketItem);
router.delete('/:id', deleteMarketItem);

router.get('/', getAllMarketItems);          
router.get('/my', getMyMarketItems);        
router.get('/user/:userId', getUserMarketItems);
router.get('/:id', getMarketItemById);     

export default router;
