// controllers/adminController.js
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const Appointment = require('../models/Appointment');
const mongoose = require('mongoose');

// @desc Admin Login
exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Update last login and activity log
    admin.last_login = new Date();
    admin.activity_logs.push({ action: 'login', detail: 'Admin logged in', timestamp: new Date() });
    await admin.save();

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({
      message: 'Login successful',
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};

// @desc Admin Dashboard Analytics API
exports.getDashboardStats = async (req, res) => {
  try {
    const doctorCount = await Doctor.countDocuments();
    const patientCount = await Patient.countDocuments();
    const appointmentCount = await Appointment.countDocuments();

    const appointmentStatusStats = await Appointment.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    const doctorActivity = await Doctor.aggregate([
      { $lookup: {
          from: 'appointments',
          localField: '_id',
          foreignField: 'doctor',
          as: 'appointments'
        }
      },
      { $project: {
          name: 1,
          email: 1,
          totalAppointments: { $size: '$appointments' }
        }
      },
      { $sort: { totalAppointments: -1 } },
      { $limit: 5 }
    ]);

    const now = new Date();
    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastSixMonthsStart = new Date(now.getFullYear(), now.getMonth() - 5, 1);

    const monthlyAppointments = await Appointment.aggregate([
      { $match: { created_at: { $gte: currentMonthStart } } },
      { $group: {
          _id: { $dayOfMonth: '$created_at' },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    const monthlyAppointmentTrends = await Appointment.aggregate([
      { $match: { created_at: { $gte: lastSixMonthsStart } } },
      { $group: {
          _id: { year: { $year: "$created_at" }, month: { $month: "$created_at" } },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    // Placeholder: Revenue & Subscription Stats (mock values)
    const revenueStats = {
      totalRevenue: 15000,
      activeSubscriptions: 42,
      monthlyRecurringRevenue: 2500
    };

    // Placeholder: System Logs / Alerts (mock data)
    const systemAlerts = [
      { type: 'login_attempt', detail: 'Failed login from IP 192.168.0.12', time: new Date() },
      { type: 'backup', detail: 'Daily backup completed', time: new Date() }
    ];

    // Placeholder: Engagement Insights (mock data)
    const engagementInsights = {
      totalFeedbacks: 86,
      avgRating: 4.3,
      topRatedDoctors: doctorActivity.slice(0, 3)
    };

    // Placeholder: Marketing Analytics (mock)
    const marketingAnalytics = {
      topTrafficSource: 'Facebook Ads',
      conversionRate: '23%',
      mostUsedPixel: 'facebook_pixel_2039'
    };

    // Placeholder: Admin Panel Action Items
    const adminActionItems = {
      profileApprovalQueue: 5,
      subscriptionExpirySoon: 3,
      lowProfileCompletionDoctors: 7
    };

    res.status(200).json({
      doctors: doctorCount,
      patients: patientCount,
      appointments: appointmentCount,
      appointmentStatusStats,
      doctorActivity,
      monthlyAppointments,
      monthlyAppointmentTrends,
      revenueStats,
      systemAlerts,
      engagementInsights,
      marketingAnalytics,
      adminActionItems
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard stats', error: error.message });
  }
};
