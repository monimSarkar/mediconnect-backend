// routes/doctorSubscriptionPurchaseRoutes.js
const express = require('express');
const router = express.Router();
const { subscribeToPlan } = require('../controllers/doctorSubscriptionPurchaseController');

// @route POST /api/doctor/subscribe
router.post('/subscribe', subscribeToPlan);

module.exports = router;
