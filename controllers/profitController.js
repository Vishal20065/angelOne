import Profit from "../models/ProfilModal.js";

// Create new profit
export const createProfit = async (req, res) => {
  try {
    const profit = new Profit(req.body);
    await profit.save();
    res.status(201).json(profit);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all profits
export const getProfits = async (req, res) => {
  try {
    const profits = await Profit.find();
    res.json(profits);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single profit
export const getProfitById = async (req, res) => {
  try {
    const profit = await Profit.findById(req.params.id);
    if (!profit) return res.status(404).json({ error: "Profit not found" });
    res.json(profit);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update profit
export const updateProfit = async (req, res) => {
  try {
    const profit = await Profit.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!profit) return res.status(404).json({ error: "Profit not found" });
    res.json(profit);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete profit
export const deleteProfit = async (req, res) => {
  try {
    const profit = await Profit.findByIdAndDelete(req.params.id);
    if (!profit) return res.status(404).json({ error: "Profit not found" });
    res.json({ message: "Profit deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get totals


// controllers/profitController.js


function toTwoDecimals(num) {
  if (num == null) return 0;
  return parseFloat(num.toFixed(2));
}

export const getTotals = async (req, res) => {
  try {
    const profits = await Profit.aggregate([
      {
        $group: {
          _id: null,
          totalRealisedPl: { $sum: "$realisedPl" },
          totalCharges: { $sum: "$charges" }
        }
      }
    ]);

    if (profits.length === 0) {
      return res.json({
        totalRealisedPl: 0.00,
        totalCharges: 0.00,
        totalNetRealised: 0.00
      });
    }

    const { totalRealisedPl, totalCharges } = profits[0];
    const totalNetRealised = totalRealisedPl - totalCharges;

    res.json({
      totalRealisedPl: toTwoDecimals(totalRealisedPl),
      totalCharges: toTwoDecimals(totalCharges),
      totalNetRealised: toTwoDecimals(totalNetRealised)
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

