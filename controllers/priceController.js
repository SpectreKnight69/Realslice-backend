import Property from '../models/Property.js';
import Transaction from '../models/Transaction.js';
import PriceHistory from '../models/PriceHistory.js';

// Update property price based on recent market activity
export const updatePrice = async (req, res) => {
  try {
    const { id } = req.params; // propertyId

    // Step 1: Identify Target Property
    const property = await Property.findOne({ propertyId: id });
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    const currentPrice = property.currentPrice;
    const totalShares = property.totalShares;
    const availableShares = property.availableShares;

    // Step 2: Gather Recent Market Data (last 20 transactions)
    const recentTransactions = await Transaction.find({ propertyId: id })
      .sort({ timestamp: -1 })
      .limit(20);

    if (recentTransactions.length === 0) {
      return res.json({
        message: "No recent transactions found",
        propertyId: id,
        oldPrice: currentPrice,
        newPrice: currentPrice,
        changePercent: 0
      });
    }

    if (recentTransactions.length < 5) {
      return res.json({
        message: `Insufficient transaction data (${recentTransactions.length} transactions). Minimum 5 transactions required for stable price calculation.`,
        propertyId: id,
        oldPrice: currentPrice,
        newPrice: currentPrice,
        changePercent: 0
      });
    }

    // Split transactions by type
    const buyTransactions = recentTransactions.filter(t => t.type === 'buy');
    const sellTransactions = recentTransactions.filter(t => t.type === 'sell');

    // Calculate demand and supply
    const demand = buyTransactions.reduce((sum, t) => sum + t.shares, 0);
    const supply = sellTransactions.reduce((sum, t) => sum + t.shares, 0);

    // Get previous price (most recent transaction's price)
    const previousPrice = recentTransactions[0].price;

    // Step 3: Calculate Market Pressure (Supply-Demand Ratio)
    const delta = (demand - supply) / (demand + supply);

    // Step 4: Estimate Volatility
    const prices = recentTransactions.map(t => t.price);
    const mean = prices.reduce((sum, price) => sum + price, 0) / prices.length;
    const variance = prices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) / prices.length;
    const standardDeviation = Math.sqrt(variance);
    const volatility = mean > 0 ? standardDeviation / mean : 0;

    // Step 5: Compute Adjusted Price
    const alpha = 0.05; // sensitivity to supply-demand changes
    const beta = 0.02; // sensitivity to volatility
    const priceChange = previousPrice * (1 + alpha * delta + beta * volatility);

    // Step 6: Limit Price Movement (Safety Bounds)
    const minPrice = previousPrice * 0.9;
    const maxPrice = previousPrice * 1.1;
    const newPrice = Math.max(minPrice, Math.min(maxPrice, priceChange));

    // Step 7: Update and Return
    property.currentPrice = newPrice;
    await property.save();

    // Calculate percentage change
    const changePercent = ((newPrice - currentPrice) / currentPrice) * 100;

    // Optionally record the price change
    await PriceHistory.create({
      propertyId: id,
      oldPrice: currentPrice,
      newPrice: newPrice,
      changePercent: changePercent
    });

    res.json({
      message: "Price updated successfully",
      propertyId: id,
      oldPrice: currentPrice,
      newPrice: newPrice,
      changePercent: parseFloat(changePercent.toFixed(2))
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
