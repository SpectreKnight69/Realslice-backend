import express from 'express';
import { createProperty, getProperties, getPropertyById, getPropertySellOrders } from '../controllers/propertyController.js';
import { protect } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/', protect, createProperty); // only logged-in user
router.get('/', getProperties);
router.get('/:id', getPropertyById);
router.get('/:id/sell-orders', getPropertySellOrders);

export default router;
