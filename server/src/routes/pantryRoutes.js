import { Router } from 'express';
import mongoose from 'mongoose';
import PantryItem from '../models/PantryItem.js';
const router = Router();
const validId = id => mongoose.Types.ObjectId.isValid(id);
router.get('/', async (_req, res, next) => { try { res.json(await PantryItem.find().sort({ createdAt: -1 })); } catch (e) { next(e); } });
router.post('/', async (req, res, next) => {
  try {
    if (!req.body.name?.trim()) return res.status(400).json({ message: 'Ingredient name is required' });
    res.status(201).json(await PantryItem.create(req.body));
  } catch (e) { next(e); }
});
router.put('/:id', async (req, res, next) => {
  try {
    if (!validId(req.params.id)) return res.status(400).json({ message: 'Invalid pantry id' });
    const item = await PantryItem.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!item) return res.status(404).json({ message: 'Pantry item not found' });
    res.json(item);
  } catch (e) { next(e); }
});
router.delete('/:id', async (req, res, next) => {
  try {
    if (!validId(req.params.id)) return res.status(400).json({ message: 'Invalid pantry id' });
    const item = await PantryItem.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Pantry item not found' });
    res.json({ message: 'Pantry item deleted successfully' });
  } catch (e) { next(e); }
});
export default router;
