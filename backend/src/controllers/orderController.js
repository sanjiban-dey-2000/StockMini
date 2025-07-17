const Order = require('../models/orderModel');

// CREATE ORDER
exports.createOrder = async (req, res) => {
  try {
    const { orderNumber, products, status, customerId } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ success: false, message: "Products are required." });
    }

    // Calculate totalAmount from products array
    const totalAmount = products.reduce((acc, item) => {
      return acc + item.priceAtPurchase * item.quantity;
    }, 0);

    const newOrder = await Order.create({
      orderNumber,
      products,
      status,
      customerId,
      totalAmount,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      newOrder,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET ALL ORDERS
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ createdBy: req.user._id })
      .populate('products.productId')
      .populate('customerId');

    res.status(200).json({
      success: true,
      existingOrder: orders,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// UPDATE ORDER
exports.updateOrder = async (req, res) => {
  try {
    let updatedData = { ...req.body };

    if (updatedData.products && updatedData.products.length > 0) {
      updatedData.totalAmount = updatedData.products.reduce((acc, item) => {
        return acc + item.priceAtPurchase * item.quantity;
      }, 0);
    }

    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, updatedData, { new: true })
      .populate('products.productId')
      .populate('customerId');

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: "Order not found." });
    }

    res.status(200).json({
      success: true,
      message: "Order updated successfully",
      updatedOrder,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE ORDER
exports.deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);

    if (!deletedOrder) {
      return res.status(404).json({ success: false, message: "Order not found." });
    }

    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
