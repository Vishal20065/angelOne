import express from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} from "../controllers/order1Controller.js";

const router = express.Router();

// CRUD Endpoints
router.post("/create", createOrder);       // Create
router.get("/getAll", getOrders);          // Read all
router.get("/:id", getOrderById);    // Read single
router.put("/:id", updateOrder);     // Update
router.delete("/:id", deleteOrder);  // Delete

export default router;
