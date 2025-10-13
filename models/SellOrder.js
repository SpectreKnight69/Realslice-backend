import mongoose from 'mongoose';

const sellOrderSchema = new mongoose.Schema({
  propertyId: { type: String, required: true }, // Auto-generated property ID like PROP00001
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  shares: { type: Number, required: true },
  pricePerShare: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('sellOrder', sellOrderSchema);
