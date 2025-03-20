const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./config/db'); // MongoDB কানেকশন ফাইল

// Middleware
app.use(cors());
app.use(express.json());

// Connect Database
connectDB(); // MongoDB কানেকশন শুরু করা

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/subscription', require('./routes/doctorSubscriptionRoutes'));
app.use('/api/plans', require('./routes/subscriptionPlanRoutes'));
app.use('/api/doctors', require('./routes/doctorRoutes'));
app.use('/api/appointments', require('./routes/appointmentRoutes'));
app.use('/api/clinics', require('./routes/clinicRoutes'));
app.use('/api/schedules', require('./routes/scheduleRoutes'));
app.use('/api/patients', require('./routes/patientRoutes'));

// Server Listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

//Helmet (Security Middleware for Express.js)
const helmet = require('helmet');
app.use(helmet());
