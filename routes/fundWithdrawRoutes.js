import express from "express";
import {
  createFundWithdraw,
  getFundWithdraws,
  getFundWithdrawById,
  updateFundWithdraw,
  deleteFundWithdraw,
} from "../controllers/fundWithdrawController.js";

const router = express.Router();

router.post("/create", createFundWithdraw);         // ✅ Create
router.get("/get", getFundWithdraws);            // ✅ Get All
router.get("/getOne/:id", getFundWithdrawById);      // ✅ Get One
router.put("/update/:id", updateFundWithdraw);       // ✅ Update
router.delete("/dalete/:id", deleteFundWithdraw);    // ✅ Delete

export default router;
