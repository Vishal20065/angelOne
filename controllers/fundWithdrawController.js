import FundWithDraw from "../models/fundWithdrawn.js";

// ✅ Create Fund Withdraw
export const createFundWithdraw = async (req, res) => {
  try {
    const fundWithdraw = new FundWithDraw(req.body);
    const savedFundWithdraw = await fundWithdraw.save();
    res.status(201).json(savedFundWithdraw);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ✅ Get All Fund Withdraws
export const getFundWithdraws = async (req, res) => {
  try {
    const fundWithdraws = await FundWithDraw.find().sort({ createdAt: -1 });
    res.status(200).json(fundWithdraws);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get Single Fund Withdraw by ID
export const getFundWithdrawById = async (req, res) => {
  try {
    const fundWithdraw = await FundWithDraw.findById(req.params.id);
    if (!fundWithdraw) return res.status(404).json({ message: "Not Found" });
    res.status(200).json(fundWithdraw);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Update Fund Withdraw
export const updateFundWithdraw = async (req, res) => {
  try {
    const updatedFundWithdraw = await FundWithDraw.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedFundWithdraw) return res.status(404).json({ message: "Not Found" });
    res.status(200).json(updatedFundWithdraw);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ✅ Delete Fund Withdraw
export const deleteFundWithdraw = async (req, res) => {
  try {
    const deletedFundWithdraw = await FundWithDraw.findByIdAndDelete(req.params.id);
    if (!deletedFundWithdraw) return res.status(404).json({ message: "Not Found" });
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
