import Order1 from "../models/Order1.js";

// ➝ Create new Order
export const createOrder = async (req, res) => {
  try {
    const newOrder = new Order1(req.body);
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ➝ Get all Orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order1.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ➝ Get single Order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order1.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ➝ Update Order
export const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order1.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedOrder) return res.status(404).json({ message: "Order not found" });
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ➝ Delete Order
export const deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order1.findByIdAndDelete(req.params.id);
    if (!deletedOrder) return res.status(404).json({ message: "Order not found" });
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
