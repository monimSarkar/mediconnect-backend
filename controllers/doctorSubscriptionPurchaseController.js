// controllers/doctorSubscriptionPurchaseController.js
const DoctorSubscription = require('../models/DoctorSubscription');
const SubscriptionPlan = require('../models/SubscriptionPlan');

// @desc Doctor subscribes to a plan
exports.subscribeToPlan = async (req, res) => {
  try {
    const { doctorId, planId, payment_method, transaction_id } = req.body;

    // Check if plan exists
    const plan = await SubscriptionPlan.findById(planId);
    if (!plan || !plan.is_active) {
      return res.status(404).json({ message: 'Selected plan not found or inactive.' });
    }

    // Calculate subscription dates
    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + plan.duration_months);

    // Create Doctor Subscription Record
    const newSubscription = await DoctorSubscription.create({
      doctor: doctorId,
      plan_name: plan.plan_name,
      price: plan.price,
      duration_months: plan.duration_months,
      features: plan.features,
      payment_status: 'paid', // Placeholder - update later with real payment status
      payment_gateway: payment_method,
      transaction_id: transaction_id || 'txn_' + Date.now(),
      subscription_start: startDate,
      subscription_end: endDate,
      is_active: true
    });

    res.status(201).json({ message: 'Subscription activated successfully', subscription: newSubscription });
  } catch (error) {
    res.status(500).json({ message: 'Subscription activation failed', error: error.message });
  }
};
