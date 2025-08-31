// src/controllers/itemController.js
import { Item } from '../models/itemModel.js';

// Create a new lost/found item
export async function createItem(req, res, next) {
  try {
    const { name, description, image_url, status } = req.body;

    if (!name || !status) {
      return res.status(400).json({ message: 'Name and status are required' });
    }

    function convertDriveLink(url) {
        if (!url) return null;
        const match = url.match(/\/d\/(.*?)\//);
        if (match && match[1]) {
        return `https://drive.google.com/uc?export=view&id=${match[1]}`;
      }
      return url;
    }

    const newItem = await Item.create({
    user_id: req.user.id,
    name,
    description,
    image_url: convertDriveLink(image_url),
    status
  });

    res.status(201).json({ message: 'Item reported', item: newItem });
  } catch (err) {
    next(err);
  }
}

// Get all items (search, filter, pagination, sorting)
export async function getItems(req, res, next) {
  try {
    const { name, status, limit, offset, sort } = req.query;

    const items = await Item.getAll({
      name,
      status,
      limit,
      offset,
      sort: sort === 'ASC' ? 'ASC' : 'DESC' // default DESC
    });

    res.json(items);
  } catch (err) {
    next(err);
  }
}

// Get single item by ID
export async function getItemById(req, res, next) {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    res.json(item);
  } catch (err) {
    next(err);
  }
}

export async function deleteItem(req, res, next) {
  try {
    const itemId = req.params.id;

    const item = await Item.findById(itemId);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    // Only allow the owner to delete
    if (String(item.user_id) !== String(req.user.id)) {
      return res.status(403).json({ message: 'Not authorized to delete this item' });
    }

    await Item.deleteById(itemId);

    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    next(err);
  }
}
