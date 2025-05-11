const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// Create item
router.post('/', async (req, res) => {
  try {
    const item = new Item(req.body);
    await item.save();
    res.status(201).send(item);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Get all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find().sort({ lastUpdated: -1 });
    res.send(items);
  } catch (err) {
    res.status(500).send();
  }
});

// Update item
router.patch('/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'category', 'quantity', 'problem'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).send();
    
    updates.forEach(update => item[update] = req.body[update]);
    item.lastUpdated = Date.now();
    await item.save();
    res.send(item);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Delete item
router.delete('/:id', async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).send();
    res.send(item);
  } catch (err) {
    res.status(500).send();
  }
});

module.exports = router;