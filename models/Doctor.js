// models/Doctor.js
const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  specialization: String,
  experience_years: Number,
  education: String,
  bio: String,
  languages_spoken: [String],
  profile_image: String,
  social_links: {
    facebook: String,
    linkedin: String,
    website: String
  },
  gallery_images: [String],
  certificates: [String],
  custom_domain: String,
  subdomain: String,
  marketing_integrations: {
    facebook_pixel_id: String,
    google_tag_manager_id: String,
    google_analytics_id: String,
    custom_script_header: String,
    custom_script_footer: String
  },
  notification_preferences: {
    email: { type: Boolean, default: true },
    sms: { type: Boolean, default: true },
    whatsapp: { type: Boolean, default: false },
    in_app: { type: Boolean, default: true }
  },
  clinics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Clinic' }],
  schedules: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Schedule' }],
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Doctor', DoctorSchema);
