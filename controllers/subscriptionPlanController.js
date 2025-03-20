// controllers/subscriptionPlanController.js
const SubscriptionPlan = require('../models/SubscriptionPlan');

// @desc Create a new subscription plan
exports.createPlan = async (req, res) => {
  try {
    const plan = new SubscriptionPlan(req.body);
    await plan.save();
    res.status(201).json({ message: 'Subscription plan created successfully', plan });
  } catch (error) {
    res.status(500).json({ message: 'Error creating subscription plan', error: error.message });
  }
};

// @desc Get all subscription plans
exports.getAllPlans = async (req, res) => {
  try {
    const plans = await SubscriptionPlan.find();
    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching plans', error: error.message });
  }
};

// @desc Get a single plan by ID
exports.getPlanById = async (req, res) => {
  try {
    const plan = await SubscriptionPlan.findById(req.params.id);
    if (!plan) return res.status(404).json({ message: 'Plan not found' });
    res.status(200).json(plan);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching plan', error: error.message });
  }
};

// @desc Update a plan
exports.updatePlan = async (req, res) => {
  try {
    const updated = await SubscriptionPlan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Plan not found' });
    res.status(200).json({ message: 'Plan updated successfully', updated });
  } catch (error) {
    res.status(500).json({ message: 'Error updating plan', error: error.message });
  }
};

// @desc Delete a plan
exports.deletePlan = async (req, res) => {
  try {
    const deleted = await SubscriptionPlan.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Plan not found' });
    res.status(200).json({ message: 'Plan deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting plan', error: error.message });
  }
};
