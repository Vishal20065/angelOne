import express from "express";
import {
  createOrder2,
  getOrders2,
  getOrder2ById,
  updateOrder2,
  deleteOrder2,
} from "../controllers/order2Controller.js";

const router = express.Router();

// CRUD Endpoints
router.post("/create", createOrder2);       // Create
router.get("/getAll", getOrders2);          // Read all
router.get("/:id", getOrder2ById);    // Read single
router.put("/:id", updateOrder2);     // Update
router.delete("/:id", deleteOrder2);  // Delete

export default router;
