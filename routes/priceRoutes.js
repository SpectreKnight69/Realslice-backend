import express from 'express';
import { updatePrice } from '../controllers/priceController.js';

const router = express.Router();

router.post('/:id/update-price', updatePrice);

export default router;
