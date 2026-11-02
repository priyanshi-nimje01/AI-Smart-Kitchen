import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import recipeRoutes from './src/routes/recipeRoutes.js';
import pantryRoutes from './src/routes/pantryRoutes.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.get('/api/health', (_req, res) => res.json({ message: 'AI Smart Kitchen API is running' }));
app.use('/api/recipes', recipeRoutes);
app.use('/api/pantry', pantryRoutes);
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Server error' });
});
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch(err => { console.error('MongoDB connection failed:', err.message); process.exit(1); });
