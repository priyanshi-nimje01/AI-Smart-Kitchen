import { Router } from 'express';
import mongoose from 'mongoose';
import Recipe from '../models/Recipe.js';
const router = Router();
const validId = id => mongoose.Types.ObjectId.isValid(id);
router.get('/', async (req, res, next) => {
  try {
    const filter = req.query.search ? { name: { $regex: req.query.search, $options: 'i' } } : {};
    res.json(await Recipe.find(filter).sort({ createdAt: -1 }));
  } catch (e) { next(e); }
});
router.get('/:id', async (req, res, next) => {
  try {
    if (!validId(req.params.id)) return res.status(400).json({ message: 'Invalid recipe id' });
    const item = await Recipe.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Recipe not found' });
    res.json(item);
  } catch (e) { next(e); }
});
router.post('/', async (req, res, next) => {
  try {
    const { name, category, ingredients, instructions, prepTime, difficulty } = req.body;
    if (!name?.trim()) return res.status(400).json({ message: 'Recipe name is required' });
    const item = await Recipe.create({ name, category, ingredients: Array.isArray(ingredients) ? ingredients : [], instructions, prepTime, difficulty });
    res.status(201).json(item);
  } catch (e) { next(e); }
});
router.put('/:id', async (req, res, next) => {
  try {
    if (!validId(req.params.id)) return res.status(400).json({ message: 'Invalid recipe id' });
    const item = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!item) return res.status(404).json({ message: 'Recipe not found' });
    res.json(item);
  } catch (e) { next(e); }
});
router.delete('/:id', async (req, res, next) => {
  try {
    if (!validId(req.params.id)) return res.status(400).json({ message: 'Invalid recipe id' });
    const item = await Recipe.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Recipe not found' });
    res.json({ message: 'Recipe deleted successfully' });
  } catch (e) { next(e); }
});
export default router;
