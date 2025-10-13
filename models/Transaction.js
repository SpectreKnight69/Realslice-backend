import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  propertyId: { type: String, required: true }, 
  type: { type: String, enum: ['buy', 'sell'], required: true },
  shares: { type: Number, required: true },
  price: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('Transaction', transactionSchema);
