import mongoose from 'mongoose';

const priceHistorySchema = new mongoose.Schema({
  propertyId: { type: String, required: true }, // Auto-generated property ID like PROP00001
  oldPrice: { type: Number, required: true },
  newPrice: { type: Number, required: true },
  changePercent: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('PriceHistory', priceHistorySchema);
