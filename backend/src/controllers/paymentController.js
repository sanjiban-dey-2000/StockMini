const Payment = require('../models/paymentModel');

exports.addPayment = async (req, res) => {
  try {
    const newPayment = await Payment.create({ ...req.body, createdBy: req.user._id });
    res.status(201).json({ success: true, message: "Payment recorded", newPayment });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ createdBy: req.user._id }).populate('orderId');
    res.status(200).json({ success: true, existingPayment: payments });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
