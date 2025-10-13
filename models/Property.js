import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  propertyId: { type: String, unique: true },
  name: { type: String, required: true },
  location: String,
  currentPrice: { type: Number, default: 0 },
  totalShares: { type: Number, default: 0 },
  availableShares: { type: Number, default: 0 },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

propertySchema.pre('save', async function (next) {
  if (!this.propertyId) {
    const count = await mongoose.model('Property').countDocuments();
    this.propertyId = `PROP${(count + 1).toString().padStart(5, '0')}`;
  }
  next();
});

export default mongoose.model('Property', propertySchema);
