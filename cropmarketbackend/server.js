import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/AuthRoutes.js';
import cropRoutes from './routes/CropRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// basic health route
app.get('/', (req, res) => res.send('CropMarket API is running'));

// routes
app.use('/api/auth', authRoutes);
app.use('/api/crops', cropRoutes);

// connect DB and start server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
})
.catch((err) => console.error('MongoDB connection error:', err));
