// models/SubscriptionPlan.js
const mongoose = require('mongoose');

const SubscriptionPlanSchema = new mongoose.Schema({
  plan_name: { type: String, required: true, unique: true },
  description: { type: String },
  price: { type: Number, required: true },
  duration_months: { type: Number, required: true },
  features: [String],
  is_active: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SubscriptionPlan', SubscriptionPlanSchema);
