import mongoose from 'mongoose';
const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  category: { type: String, default: 'General', trim: true },
  ingredients: [{ type: String, trim: true }],
  instructions: { type: String, default: '' },
  prepTime: { type: Number, default: 15, min: 0 },
  difficulty: { type: String, enum: ['Easy','Medium','Hard'], default: 'Easy' }
}, { timestamps: true });
export default mongoose.model('Recipe', recipeSchema);
