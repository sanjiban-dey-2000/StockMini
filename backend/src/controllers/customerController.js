const Customer = require('../models/customerModel');

exports.addCustomer = async (req, res) => {
  try {
    const newCustomer = await Customer.create({ ...req.body, createdBy: req.user._id });
    res.status(201).json({ success: true, message: "Customer added successfully", newCustomer });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({ createdBy: req.user._id });
    res.status(200).json({ success: true, existingCustomer: customers });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ success: true, message: "Customer updated", customer });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Customer deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
