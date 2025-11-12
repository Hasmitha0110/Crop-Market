import express from 'express';
import {
  createCrop,
  getCropsPublic,
  getMyCrops,
  updateCrop,
  deleteCrop,
  updateStatus
} from '../controllers/CropController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public: list/search/filter crops (for buyers)
router.get('/', getCropsPublic);

// Protected: farmer-specific routes
router.get('/my', verifyToken, getMyCrops);
router.post('/', verifyToken, createCrop);
router.put('/:id', verifyToken, updateCrop);
router.patch('/:id/status', verifyToken, updateStatus);
router.delete('/:id', verifyToken, deleteCrop);

export default router;
