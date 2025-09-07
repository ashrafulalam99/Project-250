import { MarketModel } from '../models/marketModel.js';

// Create a new marketplace item
export async function createMarketItem(req, res, next) {
  try {
    const { title, description, type, price, image_url } = req.body;

    if (!title || !type) {
      return res.status(400).json({ message: 'Title and type are required' });
    }

    const newItem = await MarketModel.create({
      user_id: req.user.id,
      title,
      description,
      type,
      price,
      image_url // <- include optional image URL
    });

    res.status(201).json({ message: 'Marketplace item created', item: newItem });
  } catch (err) {
    next(err);
  }
}

// Get all marketplace items, optionally filtered by type
export async function getAllMarketItems(req, res, next) {
  try {
    const { type } = req.query;
    const items = await MarketModel.getAll({ type });
    res.json(items);
  } catch (err) {
    next(err);
  }
}

// Get a single marketplace item by ID
export async function getMarketItemById(req, res, next) {
  try {
    const item = await MarketModel.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (err) {
    next(err);
  }
}

// Get logged-in user’s marketplace items
export async function getMyMarketItems(req, res, next) {
  try {
    const items = await MarketModel.getItemsByUser(req.user.id);
    res.json(items); 
  } catch (err) {
    next(err);
  }
}

// Get any user’s marketplace items by userId param
export async function getUserMarketItems(req, res, next) {
  try {
    const items = await MarketModel.getItemsByUser(req.params.userId);
    res.json(items);
  } catch (err) {
    next(err);
  }
}

// Delete a marketplace item (owner only)
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
