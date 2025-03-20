// controllers/doctorSubscriptionController.js
const DoctorSubscription = require('../models/DoctorSubscription');

// @desc Create New Subscription
exports.createSubscription = async (req, res) => {
  try {
    const subscription = new DoctorSubscription(req.body);
    await subscription.save();
    res.status(201).json({ message: 'Subscription created successfully', subscription });
  } catch (error) {
    res.status(500).json({ message: 'Error creating subscription', error: error.message });
  }
};

// @desc Get All Subscriptions
exports.getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await DoctorSubscription.find().populate('doctor');
    res.status(200).json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subscriptions', error: error.message });
  }
};

// @desc Get Subscription by ID
exports.getSubscriptionById = async (req, res) => {
  try {
    const subscription = await DoctorSubscription.findById(req.params.id).populate('doctor');
    if (!subscription) return res.status(404).json({ message: 'Subscription not found' });
    res.status(200).json(subscription);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subscription', error: error.message });
  }
};

// @desc Update Subscription
exports.updateSubscription = async (req, res) => {
  try {
    const updated = await DoctorSubscription.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Subscription not found' });
    res.status(200).json({ message: 'Subscription updated', updated });
  } catch (error) {
    res.status(500).json({ message: 'Error updating subscription', error: error.message });
  }
};

// @desc Delete Subscription
exports.deleteSubscription = async (req, res) => {
  try {
    const deleted = await DoctorSubscription.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Subscription not found' });
    res.status(200).json({ message: 'Subscription deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting subscription', error: error.message });
  }
};
