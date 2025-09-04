import express from "express";
import {
  createProfit,
  getProfits,
  getProfitById,
  updateProfit,
  deleteProfit,
  getTotals
} from "../controllers/profitController.js";

const router = express.Router();

// CRUD routes
router.post("/create", createProfit);
router.get("/getAll", getProfits);
router.get("/getOne/:id", getProfitById);
router.put("/update/:id", updateProfit);
router.delete("/delete/:id", deleteProfit);

// Totals API
router.get("/summary/totals", getTotals);

export default router;
