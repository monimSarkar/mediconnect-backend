// models/DoctorSubscription.js
const mongoose = require('mongoose');

const DoctorSubscriptionSchema = new mongoose.Schema({
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  plan_name: { type: String, required: true },
  price: { type: Number, required: true },
  duration_months: { type: Number, required: true },
  features: [String],
  payment_status: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
  payment_gateway: { type: String, enum: ['sslcommerz', 'stripe', 'manual'], default: 'sslcommerz' },
  transaction_id: { type: String },
  subscription_start: { type: Date },
  subscription_end: { type: Date },
  is_active: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('DoctorSubscription', DoctorSubscriptionSchema);
