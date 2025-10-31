const express = require('express');
const {
  getOffices,
  getOffice,
  createOffice,
  updateOffice,
  deleteOffice,
  getNearbyOffices,
} = require('../controllers/officeController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/nearby/:lng/:lat/:distance', protect, getNearbyOffices);

router
  .route('/')
  .get(protect, getOffices)
  .post(protect, authorize('admin'), createOffice);

router
  .route('/:id')
  .get(protect, getOffice)
  .put(protect, authorize('admin'), updateOffice)
  .delete(protect, authorize('admin'), deleteOffice);

module.exports = router;
