import FundAdd from "../models/fundAdded.js";

// ➕ Create Fund
export const createFund = async (req, res) => {
  try {
    const fund = new FundAdd(req.body);
    await fund.save();
    res.status(201).json(fund);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 📖 Get All Funds
export const getFunds = async (req, res) => {
  try {
    const funds = await FundAdd.find().sort({ createdAt: -1 });
    res.json(funds);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📖 Get Single Fund by ID
export const getFundById = async (req, res) => {
  try {
    const fund = await FundAdd.findById(req.params.id);
    if (!fund) return res.status(404).json({ message: "Fund not found" });
    res.json(fund);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✏️ Update Fund
export const updateFund = async (req, res) => {
  try {
    const fund = await FundAdd.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!fund) return res.status(404).json({ message: "Fund not found" });
    res.json(fund);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ❌ Delete Fund
export const deleteFund = async (req, res) => {
  try {
    const fund = await FundAdd.findByIdAndDelete(req.params.id);
    if (!fund) return res.status(404).json({ message: "Fund not found" });
    res.json({ message: "Fund deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
