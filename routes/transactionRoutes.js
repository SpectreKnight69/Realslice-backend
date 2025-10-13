import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { createSellOrder } from '../controllers/transactionController.js';
import { buyFromOrder } from '../controllers/transactionController.js';

const router = express.Router();

router.post('/sell-order', protect, createSellOrder);
router.post('/buy-order', protect, buyFromOrder);

export default router;
