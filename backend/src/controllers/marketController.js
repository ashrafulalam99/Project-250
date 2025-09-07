// src/controllers/marketController.js
import { MarketModel } from '../models/marketModel.js';

export async function createMarketItem(req, res, next) {
  try {
    const { title, description, type, price } = req.body;

    if (!title || !type) {
      return res.status(400).json({ message: 'Title and type are required' });
    }

    const newItem = await MarketModel.create({
      user_id: req.user.id,
      title,
      description,
      type,
      price
    });

    res.status(201).json({ message: 'Marketplace item created', item: newItem });
  } catch (err) {
    next(err);
  }
}

export async function getAllMarketItems(req, res, next) {
  try {
    const { type } = req.query;
    const items = await MarketModel.getAll({ type });
    res.json(items);
  } catch (err) {
    next(err);
  }
}

export async function getMarketItemById(req, res, next) {
  try {
    const item = await MarketModel.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (err) {
    next(err);
  }
}

export async function getMyMarketItems(req, res, next) {
  try {
    const items = await MarketModel.getItemsByUser(req.user.id);
    res.json(items); 
  } catch (err) {
    next(err);
  }
}

export async function getUserMarketItems(req, res, next) {
  try {
    const items = await MarketModel.getItemsByUser(req.params.userId);
    res.json(items);
  } catch (err) {
    next(err);
  }
}

export async function deleteMarketItem(req, res, next) {
  try {
    const item = await MarketModel.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    if (String(item.user_id) !== String(req.user.id)) {
      return res.status(403).json({ message: 'Not authorized to delete this item' });
    }

    await MarketModel.deleteById(req.params.id);
    res.json({ message: 'Marketplace item deleted successfully' });
  } catch (err) {
    next(err);
  }
}
