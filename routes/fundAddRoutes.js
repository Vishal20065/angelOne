import express from "express";
import {
  createFund,
  getFunds,
  getFundById,
  updateFund,
  deleteFund
} from "../controllers/fundAddController.js";

const router = express.Router();

router.post("/create", createFund);      // ➕ Create
router.get("/get", getFunds);         // 📖 Read All
router.get("/getOne/:id", getFundById);   // 📖 Read One
router.put("/update/:id", updateFund);    // ✏️ Update
router.delete("/delete/:id", deleteFund); // ❌ Delete

export default router;
