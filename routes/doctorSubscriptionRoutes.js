// routes/doctorSubscriptionRoutes.js
const express = require('express');
const router = express.Router();
const {
  createSubscription,
  getAllSubscriptions,
  getSubscriptionById,
  updateSubscription,
  deleteSubscription
} = require('../controllers/doctorSubscriptionController');

// @route POST /api/subscription/create
router.post('/create', createSubscription);

// @route GET /api/subscription/all
router.get('/all', getAllSubscriptions);

// @route GET /api/subscription/:id
router.get('/:id', getSubscriptionById);

// @route PUT /api/subscription/:id
router.put('/:id', updateSubscription);

// @route DELETE /api/subscription/:id
router.delete('/:id', deleteSubscription);

module.exports = router;
