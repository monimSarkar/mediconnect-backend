// routes/subscriptionPlanRoutes.js
const express = require('express');
const router = express.Router();
const {
  createPlan,
  getAllPlans,
  getPlanById,
  updatePlan,
  deletePlan
} = require('../controllers/subscriptionPlanController');

// @route POST /api/plans/create
router.post('/create', createPlan);

// @route GET /api/plans
router.get('/', getAllPlans);

// @route GET /api/plans/:id
router.get('/:id', getPlanById);

// @route PUT /api/plans/:id
router.put('/:id', updatePlan);

// @route DELETE /api/plans/:id
router.delete('/:id', deletePlan);

module.exports = router;
