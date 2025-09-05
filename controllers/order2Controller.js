import Order2 from "../models/Order2.js";

// ➝ Create new Order2
export const createOrder2 = async (req, res) => {
  try {
    const newOrder = new Order2(req.body);
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ➝ Get all Orders
export const getOrders2 = async (req, res) => {
  try {
    const orders = await Order2.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ➝ Get single Order by ID
export const getOrder2ById = async (req, res) => {
  try {
    const order = await Order2.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ➝ Update Order
export const updateOrder2 = async (req, res) => {
  try {
    const updatedOrder = await Order2.findByIdAndUpdate(
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
export const deleteOrder2 = async (req, res) => {
  try {
    const deletedOrder = await Order2.findByIdAndDelete(req.params.id);
    if (!deletedOrder) return res.status(404).json({ message: "Order not found" });
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
