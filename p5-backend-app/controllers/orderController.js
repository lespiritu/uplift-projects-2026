import Orders from "../models/orderModel.js";

const createOrder = async (req, res) => {
  try {
    const { fullName, contactNumber, address, items } = req.body;

    if (!fullName || !contactNumber || !address) {
      return res.status(400).json({
        message: "Full name, contact number, and address are required",
      });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Order items are required" });
    }

    const sanitizedItems = items.map((item) => ({
      foodId: item._id,
      name: item.name,
      price: Number(item.price),
      quantity: Number(item.quantity),
    }));

    const hasInvalidItem = sanitizedItems.some(
      (item) =>
        !item.foodId ||
        !item.name ||
        Number.isNaN(item.price) ||
        item.price < 0 ||
        Number.isNaN(item.quantity) ||
        item.quantity < 1,
    );

    if (hasInvalidItem) {
      return res.status(400).json({ message: "Invalid order items" });
    }

    const totalAmount = sanitizedItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );

    const savedOrder = await Orders.create({
      fullName: fullName.trim(),
      contactNumber: contactNumber.trim(),
      address: address.trim(),
      items: sanitizedItems,
      totalAmount,
    });

    res.status(201).json({
      message: "Order created successfully",
      order: savedOrder,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const response = await Orders.find();

    res.json(response);
    res.status(500).json({ message: error.message });
  } catch (error) {}
};
export { createOrder, getOrders };
