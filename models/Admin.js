// models/Admin.js (Final Version - Future-Proof Standard)
const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, default: 'admin' },
  last_login: { type: Date },
  activity_logs: [
    {
      action: String,
      detail: String,
      timestamp: { type: Date, default: Date.now }
    }
  ],
  notification_preferences: {
    email: { type: Boolean, default: true },
    sms: { type: Boolean, default: false },
    in_app: { type: Boolean, default: true }
  },
  dashboard_settings: {
    widgets_visibility: {
      revenueStats: { type: Boolean, default: true },
      doctorActivity: { type: Boolean, default: true },
      engagementInsights: { type: Boolean, default: true },
      marketingAnalytics: { type: Boolean, default: true }
    }
  },
  preferences: {
    timezone: { type: String, default: 'Asia/Dhaka' },
    language: { type: String, default: 'en' },
    theme: { type: String, default: 'light' }
  },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Admin', AdminSchema);
