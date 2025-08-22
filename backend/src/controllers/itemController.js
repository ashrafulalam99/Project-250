import { Item } from '../models/itemModel.js';

// Create a new lost/found item
export async function createItem(req, res, next) {
  try {
    const { name, description, image_url, status } = req.body;

    if (!name || !status) {
      return res.status(400).json({ message: 'Name and status are required' });
    }

    // user_id comes from JWT auth middleware
    const newItem = await Item.create({
      user_id: req.user.id,
      name,
      description,
      image_url,
      status
    });

    res.status(201).json({ message: 'Item reported', item: newItem });
  } catch (err) {
    next(err);
  }
}

// Get all items (optional search by name)
export async function getItems(req, res, next) {
  try {
    const { name } = req.query;
    const items = await Item.getAll({ name });
    res.json(items);
  } catch (err) {
    next(err);
  }
}

// Get a single item by ID (optional)
export async function getItemById(req, res, next) {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (err) {
    next(err);
  }
}
