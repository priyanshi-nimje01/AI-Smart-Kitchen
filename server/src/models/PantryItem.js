import mongoose from 'mongoose';
const pantrySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  quantity: { type: Number, default: 1, min: 0 },
  unit: { type: String, default: 'pcs', trim: true },
  expiryDate: { type: Date, default: null }
}, { timestamps: true });
export default mongoose.model('PantryItem', pantrySchema);
